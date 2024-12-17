<script lang="ts">
    import Layout from "../Components/Layout.svelte";

    let { title } = $props();
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<Layout>
    <h1 class="text-4xl font-semibold">
        Use Inertia.js with Svelte and Laravel
    </h1>
</Layout>
