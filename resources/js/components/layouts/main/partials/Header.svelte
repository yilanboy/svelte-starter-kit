<script lang="ts">
  interface Props {
    toggleSidebar: () => void;
  }
  let { toggleSidebar }: Props = $props();
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
        <svg
          class="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
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
