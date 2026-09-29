# Cloud Quest - AWS CLF-C02 Practice

A local React quiz app with 100 original Cloud Practitioner style questions plus local scenario variants. Progress is stored in your browser's localStorage; no account, backend, or paid API is required.

## Start

```powershell
npm.cmd install --include=dev
npm.cmd run dev
```

Open <http://127.0.0.1:5173/>. Run `npm.cmd run build` to verify the production bundle.

Questions live in `src/data/questions/` and are validated when the app starts in development. Each seed includes a question, four options with individual explanations, correct option indexes, and an overall explanation. The local generator combines reviewed scenario patterns into up to 4,500 variants. It uses the `QuestionGenerator` interface in `src/types.ts`; no AI service is needed.

## Cloudflare Worker deployment

This is a static Vite app; Wrangler uploads `dist/` as Worker assets. No Worker script or backend is needed. The Worker name in `wrangler.jsonc` must match the Cloudflare project name.

In Cloudflare Workers & Pages, connect this GitHub repository to the Worker under **Settings > Build**. Set the production branch to `main`, build command to `npm run build`, and deploy command to `npx wrangler deploy`. The package also runs the build in npm's `prepare` step, so a Cloudflare install followed by its default deploy command creates `dist/` even if the dashboard build command is blank. Subsequent pushes to `main` trigger deployment. You can check the configuration locally with `npm run build` and `npx wrangler deploy --dry-run`.
