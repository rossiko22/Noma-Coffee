import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { spikePing } from "@/lib/api/spike.functions";

// PHASE 0.5 DEPLOYMENT SPIKE — throwaway. Delete before feature work.
// Tests the SWA "static index.html vs /api catch-all" routing risk:
//   1. This route must be served as PRERENDERED static HTML from the SWA CDN.
//   2. The button must successfully reach the server fn (managed Function).
// Both must work in the DEPLOYED Azure environment, not just `vite dev`.
export const Route = createFileRoute("/spike")({
  head: () => ({ meta: [{ title: "Spike — deploy check" }] }),
  component: SpikePage,
});

function SpikePage() {
  const [result, setResult] = useState("(not called)");
  return (
    <section className="section-y container-x">
      <p className="eyebrow mb-4">Deploy spike</p>
      <h1 className="mb-6">Static route OK.</h1>
      <p className="mb-6 text-muted-foreground">
        If you can read this from the deployed SWA URL, static serving works.
      </p>
      <button
        className="btn-primary"
        onClick={async () => {
          try {
            setResult(JSON.stringify(await spikePing()));
          } catch (e) {
            setResult(`ERROR: ${String(e)}`);
          }
        }}
      >
        Call server fn
      </button>
      <pre className="mt-6 text-sm">{result}</pre>
    </section>
  );
}
