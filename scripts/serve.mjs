import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const options = { port: 4173, base: '/' };
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--help') {
    console.log('Usage: npm run dev -- [--port 4173] [--base /portfolio/]');
    process.exit(0);
  }
  if (args[i] === '--port' && args[i + 1]) options.port = Number(args[++i]);
  else if (args[i] === '--base' && args[i + 1]) options.base = args[++i];
  else throw new Error(`Unknown or incomplete option: ${args[i]}`);
}

if (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535) {
  throw new Error('Port must be an integer between 1 and 65535.');
}
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(options.base)) {
  throw new Error('Base must start and end with /, for example /portfolio/.');
}

const root = await realpath(fileURLToPath(new URL('../dist/', import.meta.url)));
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function insideRoot(candidate) {
  const relative = path.relative(root, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function reply(response, status, message, head = false) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(head ? undefined : message);
}

const server = createServer(async (request, response) => {
  const head = request.method === 'HEAD';
  if (request.method !== 'GET' && !head) {
    response.setHeader('Allow', 'GET, HEAD');
    reply(response, 405, 'Method not allowed.');
    return;
  }

  try {
    const url = new URL(request.url ?? '/', 'http://127.0.0.1');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').includes('..')) {
      reply(response, 400, 'Invalid path.', head);
      return;
    }
    if (options.base !== '/' && pathname === options.base.slice(0, -1)) {
      response.writeHead(308, { Location: `${options.base}${url.search}` });
      response.end();
      return;
    }
    if (!pathname.startsWith(options.base)) {
      reply(response, 404, `Open ${options.base} to preview this site.`, head);
      return;
    }

    const relative = pathname.slice(options.base.length);
    let target = path.resolve(root, relative || 'index.html');
    if (!insideRoot(target)) {
      reply(response, 403, 'Forbidden.', head);
      return;
    }
    const initialStats = await stat(target);
    if (initialStats.isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(308, { Location: `${url.pathname}/${url.search}` });
        response.end();
        return;
      }
      target = path.join(target, 'index.html');
    }
    const resolved = await realpath(target);
    if (!insideRoot(resolved)) {
      reply(response, 403, 'Forbidden.', head);
      return;
    }
    const fileStats = await stat(resolved);
    if (!fileStats.isFile()) {
      reply(response, 404, 'File not found.', head);
      return;
    }
    const content = head ? undefined : await readFile(resolved);
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(resolved).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': fileStats.size,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(content);
  } catch (error) {
    if (error instanceof URIError || error.code === 'ERR_INVALID_URL') reply(response, 400, 'Invalid URL.', head);
    else if (['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code)) reply(response, 404, 'File not found.', head);
    else {
      console.error(error.message);
      reply(response, 500, 'Unable to serve this file.', head);
    }
  }
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${options.port} is busy. Try npm run dev -- --port 4174.` : error.message);
  process.exitCode = 1;
});
server.listen(options.port, '127.0.0.1', () => {
  console.log(`Portfolio preview: http://127.0.0.1:${options.port}${options.base}`);
  console.log('Press Ctrl+C to stop.');
});
