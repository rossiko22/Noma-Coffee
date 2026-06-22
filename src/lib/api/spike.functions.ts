import { createServerFn } from "@tanstack/react-start";

// PHASE 0.5 DEPLOYMENT SPIKE — throwaway. Delete before feature work.
// A trivial server fn that returns JSON. Used to prove that SWA managed
// Functions actually host the Nitro server output in the DEPLOYED Azure
// environment, behind the /_serverFn (or /api) catch-all — not just locally.
export const spikePing = createServerFn({ method: "GET" }).handler(async () => {
  return {
    ok: true,
    where: "swa-managed-function",
    at: new Date().toISOString(),
  };
});
