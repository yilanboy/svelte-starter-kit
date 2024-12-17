import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.ts"],
            ssr: "resources/js/ssr.ts",
            refresh: true,
        }),
        svelte(),
    ],
});
