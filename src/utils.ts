import { open } from "@tauri-apps/api/shell";

const openExternalWeb = (url: string) => window.open(url, "_blank");

const openExternalTauri = (url: string) => open(url);

export const openExternal = process.env.NEXT_PUBLIC_TAURI
  ? openExternalTauri
  : openExternalWeb;
