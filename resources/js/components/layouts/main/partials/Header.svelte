<script lang="ts">
  import SidebarClose from "@/components/icons/SidebarClose.svelte";
  import SidebarOpen from "@/components/icons/SidebarOpen.svelte";

  interface Props {
    sidebarIsOpen: boolean;
  }

  let { sidebarIsOpen = $bindable() }: Props = $props();

  function toggleSidebar() {
    sidebarIsOpen = !sidebarIsOpen;
  }
</script>

<header class="sticky top-0 z-50 h-16 bg-white shadow">
  <nav
    aria-label="Global"
    class="flex h-full items-center justify-between p-4 lg:px-8"
  >
    <div class="flex items-center gap-x-4 lg:flex-1">
      <button
        onclick={toggleSidebar}
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
      >
        <span class="sr-only">Toggle Sidebar</span>

        {#if sidebarIsOpen}
          <SidebarClose />
        {:else}
          <SidebarOpen />
        {/if}
      </button>
    </div>

    <div class="hidden lg:flex lg:gap-x-12">
      <a href="#" class="text-sm/6 font-semibold text-gray-900">Product</a>
      <a href="#" class="text-sm/6 font-semibold text-gray-900">Features</a>
      <a href="#" class="text-sm/6 font-semibold text-gray-900">Marketplace</a>
      <a href="#" class="text-sm/6 font-semibold text-gray-900">Company</a>
    </div>

    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="#" class="text-sm/6 font-semibold text-gray-900"
        >Log in <span aria-hidden="true">&rarr;</span></a
      >
    </div>
  </nav>
</header>
