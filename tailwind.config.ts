import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme: { extend: { colors: {ink:"#26201e",cream:"#f8f5f0",rose:"#ad786e"}, fontFamily:{serif:["Georgia","serif"]} } }, plugins: [] } satisfies Config;
