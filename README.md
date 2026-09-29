# Cloud Quest - AWS CLF-C02 Practice

A local React quiz app with 100 original Cloud Practitioner style questions. Progress is stored in your browser's localStorage; no account, backend, or paid API is required.

## Start

```powershell
npm.cmd install --include=dev
npm.cmd run dev
```

Open <http://127.0.0.1:5173/>. Run `npm.cmd run build` to verify the production bundle.

Questions live in `src/data/questions/` and are validated when the app starts in development. Each seed includes a question, four options with individual explanations, correct option indexes, and an overall explanation. The `QuestionGenerator` interface in `src/types.ts` is reserved for optional future generators; the app uses only its local bank today.

## Cloudflare Worker deployment

This is a static Vite app; Wrangler uploads `dist/` as Worker assets. No Worker script or backend is needed. The Worker name in `wrangler.jsonc` must match the Cloudflare project name.

In Cloudflare Workers & Pages, connect this GitHub repository to the Worker under **Settings > Builds**. Set the production branch to `main`, build command to `npm run build`, and deploy command to `npx wrangler deploy`. Subsequent pushes to `main` will trigger deployment. You can check the configuration locally with `npm run build` and `npx wrangler deploy --dry-run`.
