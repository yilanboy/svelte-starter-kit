<script>
    import { inertia } from "@inertiajs/svelte";

    let { children } = $props();
</script>

<main
    class="relative flex h-screen w-full flex-col items-center justify-center"
>
    <header
        class="absolute left-0 top-0 flex h-20 w-full items-center justify-center gap-6 text-lg"
    >
        <a
            use:inertia
            href="/"
            class="transition duration-150 hover:text-gray-600"
        >
            Home
        </a>
        <a
            use:inertia
            href="/about"
            class="transition duration-150 hover:text-gray-600"
        >
            About
        </a>
    </header>
    <article>
        {@render children()}
    </article>
</main>
