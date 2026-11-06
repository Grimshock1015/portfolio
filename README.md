# Tommy Wang — Personal portfolio

A responsive portfolio for recruiters featuring ShenYi (Tommy) Wang's projects, technical contributions, experience, education, skills, and contact links. It uses plain HTML, CSS, and JavaScript. There are no dependencies to install and no build step; `dist/` is the complete website.

The sample identity and project content have been replaced with information from Tommy's résumé and project repositories. Featured projects include Folio, Pulse, RafflesGo, the Apache Superset Google Sheets export proposal, Planetze, a Global Game Jam prototype, Doodle Jump, and Toronto Safety Index Prediction. Project descriptions distinguish Tommy's contributions from the broader team's work and describe the Superset work as a proposal. The downloadable résumé is included at `dist/assets/tommy-wang-resume.pdf`.

Folio's entry describes its lexical retrieval, cited document answers, optional GPT-6.1 Sol generation, and small sample benchmark. Pulse's entry describes its local monitoring workflow, incident handling, and verified v0.7.0 release. Both include real application screenshots. Pulse's source link is labeled **Private repository**; the portfolio does not change either project's access settings or host the applications. No API keys, uploaded documents, local databases, or Codex configuration files are needed in this repository.

Doodle Jump's entry is based on [`game.asm`](https://github.com/Grimshock1015/Doodle_jump/blob/main/game.asm) and links to the recorded course demo. RafflesGo's team-project entry highlights Tommy's sighting submissions, IndexedDB drafts, and onboarding contributions, supported by the [submission](https://github.com/Grimshock1015/rafflesgo-group-10-public/commit/c0b368c01114067f744248448d4e957addb62e6c), [draft storage](https://github.com/Grimshock1015/rafflesgo-group-10-public/commit/75ef8d7ada789002aa1e358d1855e2a2235f4c6c), and [tutorial](https://github.com/Grimshock1015/rafflesgo-group-10-public/commit/d7f5c713012c0437e0c7110c58644c123493150c) commits. Those two cards use clearly labeled SVG illustrations, not application screenshots.

Deployment target: [GitHub repository](https://github.com/Grimshock1015/portfolio) · [GitHub Pages site](https://grimshock1015.github.io/portfolio/). Deployment runs through GitHub Actions on the `main` branch; check the repository's Actions tab for the current deployment status.

## Preview locally

Install [Node.js](https://nodejs.org/) 20 or later, open a terminal in this folder, and run:

```sh
npm run dev
```

Open [the local preview](http://127.0.0.1:4173/). Stop the server with `Ctrl+C`. If that port is busy, use `npm run dev -- --port 4174`.

To preview the same URL structure as a GitHub project site:

```sh
npm run dev -- --base /portfolio/
```

Then open [the project-path preview](http://127.0.0.1:4173/portfolio/). The preview server listens only on your own computer (`127.0.0.1`).

## Update content and appearance

Edit **`dist/portfolio.js`**. This is the single content file; keep its JavaScript structure when updating profile or project details.

| Content | What to edit |
| --- | --- |
| Identity | `name`, `initials`, `role`, `location`, `intro` |
| About and skills | `about` and `skills` |
| Experience and education | `experience` and `education` |
| Contact | `email`, `github`, `linkedin` |
| Resume | `resumeUrl` |
| Projects | The `projects` array |

For each project, add a unique `id`, its `title`, `subtitle`, `category`, `tags`, `year`, `overview`, your `contribution`, and what you `learned`. Set `liveUrl` and `sourceUrl` to verified demo and repository URLs when available. Keep unavailable links empty rather than linking to an unrelated example. Use `liveLabel` for a specific action such as `"Watch demo"`; it defaults to `"Visit project"`. Use `sourceLabel` to explain restricted access (for example, `"Private repository"`); it defaults to `"View source"`. Source links can point to team repositories or personal forks; the contribution text should accurately explain Tommy's own work. The `visual` value selects an included decorative project illustration; it is independent of the project description.

To show your actual work, put a screenshot in `dist/assets/`, set a project's `image` to `"./assets/my-project.png"`, and write a useful `imageAlt` description. Images replace the concept illustration on both the card and project dialog. Landscape images around 1200 × 750 pixels work well. A project can also include a `gallery` array of `{ src, caption, alt }` entries. These appear as selectable screenshots in its details; clicking the main image opens the original at full size. Project filter buttons are generated automatically from your categories; add as many projects as you need. You can also customize the `interests` list.

To update the downloadable résumé, replace `dist/assets/tommy-wang-resume.pdf`, or add a new PDF in `dist/assets/` and update `resumeUrl` with its relative path. The résumé link appears when a URL is supplied. Contact and social links are configured for Tommy.

`sampleMode` is set to `false`. Review content changes at a narrow phone width as well as a desktop width. Use only information and achievements that accurately represent Tommy's work.

You can change colors, typography, spacing, and layout in `dist/styles.css`. Keep the page title, description, and social metadata in `dist/index.html` in sync with profile changes. Interaction code lives in `dist/app.js`.

Run the lightweight checks before uploading:

```sh
npm run check
```

The checker verifies required site files, JavaScript syntax, and local file references in HTML and CSS. It also rejects root-relative asset URLs that would break under a GitHub project path. It does not verify the accuracy of your content or the availability of external links.

## GitHub Pages deployment

The deployment target is the public [`Grimshock1015/portfolio`](https://github.com/Grimshock1015/portfolio) repository. Keep **everything in this folder** at the repository root, including `dist/`, `scripts/`, `package.json`, and `.github/workflows/deploy.yml`. You do not need to move files out of `dist/`.

In the repository's **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**. A push to `main` triggers **Deploy portfolio to GitHub Pages**. The workflow can also be run manually from the **Actions** tab using **Run workflow** on `main`.

The workflow checks out the repository, runs `node scripts/check.mjs`, configures Pages, uploads `dist/` as the static-site artifact, and deploys it with GitHub's official Pages actions. Its `github-pages` environment exposes the URL returned by the deployment. If a run fails, open its failed step in the **Actions** tab for the error. If you change the deployment branch, update `branches: [main]` in `.github/workflows/deploy.yml` to match it.

The expected public URL is [https://grimshock1015.github.io/portfolio/](https://grimshock1015.github.io/portfolio/). The site uses relative local asset paths so it works under `/portfolio/` without a base-URL setting. The separate `Grimshock1015.github.io` repository is not part of this deployment.

The deployment follows GitHub's official [custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Folder layout

```text
dist/                       Complete static website, published as the site root
  index.html                Page structure and metadata
  portfolio.js              Your personal information and project content
  styles.css                Visual design
  app.js                    Page interactions
scripts/
  serve.mjs                 Local preview server
  check.mjs                 Static-file and syntax validation
.github/workflows/deploy.yml GitHub Pages deployment
package.json                Preview and check commands; no dependencies
```

GitHub Pages serves static files. Contact actions use your configured email address; no backend or form-service account is required.

For portrait mobile screenshots, set `imageOrientation` to `"portrait"` and optionally set `galleryLabel` (for example, `"INSIDE THE APP"`). A `cardImages` array can show several screenshots together on the project card.
