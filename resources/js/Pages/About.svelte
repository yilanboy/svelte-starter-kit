<script lang="ts">
    import Layout from "#components/Layout.svelte";

    let { title } = $props();
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<Layout>
    <p class="mt-6 w-full text-center text-lg">
        It's a simple template of Inertia.js.
    </p>
    <p class="mt-6 w-full text-center text-lg">
        Use Svelte as the frontend, and Laravel as the backend
    </p>
</Layout>
