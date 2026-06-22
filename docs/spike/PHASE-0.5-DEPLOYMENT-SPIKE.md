# Phase 0.5 — Azure SWA deployment spike (runbook)

**Goal:** prove, in a **real deployed Azure Static Web Apps environment**, that the Nitro `azure` preset hosts
both (a) a **prerendered static route** and (b) a **server fn** (managed Function) — before any feature work.
**This gate is not closed by a local build.** It must round-trip in deployed Azure.

> Status: **BLOCKED in the current dev environment.** No git repo/remote, no `bun`, no installed deps, no Azure
> CLI, no `gh`, no Azure subscription/auth here. The deployed verification requires the client's Azure account
> and a GitHub repo. The artifacts below are scaffolded and ready; the steps marked 👤 must be run by you
> (interactively) with the project's credentials.

## Artifacts already created
- `src/routes/spike.tsx` — trivial prerendered route with a button.
- `src/lib/api/spike.functions.ts` — trivial server fn returning JSON.
- This runbook.

All three are **throwaway** — delete after the gate passes.

## Files to add during the spike (kept here, not committed blind, until validated)

**1. Switch Nitro to the `azure` preset.** The Lovable config defaults Nitro to Cloudflare. Override via the
build env (Nitro reads `NITRO_PRESET` regardless of how config is composed):

```bash
NITRO_PRESET=azure bun run build
```

If the Lovable wrapper hardcodes the preset and ignores the env var, pass it through `defineConfig` instead:

```ts
// vite.config.ts (only if NITRO_PRESET env is ignored)
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  nitro: { preset: "azure" },
});
```

**2. Prerender the static route.** Enable TanStack Start prerendering for `/spike` so SWA serves it as static
HTML (this is the half of the gate that exercises the static-vs-`/api` routing risk). Validate the exact option
name against the installed `@tanstack/react-start` version during the spike.

**3. `staticwebapp.config.json`** (starting point — the routing fallback is THE thing to validate):

```json
{
  "navigationFallback": { "rewrite": "/index.html", "exclude": ["/_serverFn/*", "/api/*", "/assets/*", "*.*"] },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }
}
```

> ⚠️ Known risk (the reason this gate exists): SWA's `navigationFallback` can swallow the server-fn catch-all
> and rewrite it to `index.html`, so the server fn returns HTML instead of JSON. The Nitro `azure` preset may
> emit its own `staticwebapp.config.json` — confirm whether to use the generated one, merge, or replace, and
> confirm the exact server-fn path prefix (`/_serverFn/*` vs `/api/*`) for this TanStack Start version.

**4. GitHub Actions workflow** — easiest to let `az staticwebapp create` generate it (it commits the correct
workflow with the deployment token wired). Otherwise base it on `Azure/static-web-apps-deploy@v1` with
`app_location: "/"`, the Nitro `azure` output as `output_location`, and `NITRO_PRESET=azure` in the build env.

## Procedure

1. 👤 Make this a git repo + push to GitHub (the gate calls for a throwaway branch):
   ```bash
   git init && git add -A && git commit -m "chore: scaffold deploy spike"
   git checkout -b spike/azure-swa-deploy
   gh repo create <org>/northbound-site --private --source=. --push   # or push to an existing remote
   ```
2. 👤 Log in to Azure (interactive — run in your terminal):
   ```bash
   az login
   ```
3. 👤 Create the SWA (this also wires the GitHub Actions workflow + secret):
   ```bash
   az staticwebapp create -n northbound-spike -g <rg> -l westeurope \
     --source https://github.com/<org>/northbound-site --branch spike/azure-swa-deploy \
     --app-location "/" --login-with-github
   ```
4. Apply the preset switch + `staticwebapp.config.json` + prerender option; push; let Actions deploy.
5. **Verify in the DEPLOYED environment** (replace host):
   ```bash
   curl -i https://<app>.azurestaticapps.net/spike            # expect 200 text/html (prerendered)
   curl -i https://<app>.azurestaticapps.net/_serverFn/...    # expect 200 application/json {"ok":true,...}
   ```
   Also load `/spike` in a browser and click the button — expect the JSON to render, not an HTML error.

## Key Vault check (guardrail from ADR 0007)
While the SWA exists, on the **Standard** plan with a system-assigned **managed identity** granted Key Vault
access, set one app setting as a Key Vault reference and confirm it **resolves at runtime**:
```
SPIKE_SECRET = @Microsoft.KeyVault(SecretUri=https://<vault>.vault.azure.net/secrets/spike/)
```
Read it back via the spike server fn. If it resolves → use Key Vault references. If not → fall back to **plain
SWA application settings** and record the tradeoff (no central rotation/audit) in ADR 0007.

## Decision criteria
- ✅ **PASS** — both the static route and the server fn respond correctly in deployed Azure (+ note Key Vault
  result). Delete the spike artifacts; proceed to Phase 1.
- ❌ **FAIL** — SWA managed Functions cannot cleanly host the Nitro server output. **STOP.** Fallback:
  Nitro **`azure_functions`** preset deploying to a **standalone Azure Function App** fronted by the SWA (two
  resources instead of one). Document the gap and the chosen fallback in ADR 0004/0007 before any feature work.
