import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { run } from "vite-plugin-run";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.ts"],
            ssr: "resources/js/ssr.ts",
            refresh: true,
        }),
        svelte(),
        tailwindcss(),
        run([
            {
                name: "wayfinder",
                run: ["php", "artisan", "wayfinder:generate"],
                pattern: ["routes/**/*.php", "app/**/Http/**/*.php"],
            },
        ]),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./resources/js"),
        },
    },
});
