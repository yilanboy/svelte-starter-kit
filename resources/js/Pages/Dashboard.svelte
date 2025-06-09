<script lang="ts">
  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="flex items-center justify-center">
  <p>Dashboard</p>
</div>
