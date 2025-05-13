<script lang="ts">
  import LayoutMain from "@/Components/Layouts/Main/LayoutMain.svelte";

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<LayoutMain>
  <p class="mt-6 w-full text-center text-lg">
    It's a simple template of Inertia.js.
  </p>
  <p class="mt-6 w-full text-center text-lg">
    Use Svelte as the frontend, and Laravel as the backend
  </p>
</LayoutMain>
