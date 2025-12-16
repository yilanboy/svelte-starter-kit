<script lang="ts">
  import { inertia, page } from "@inertiajs/svelte";
  import Home from "@/components/icons/Home.svelte";
  import X from "@/components/icons/X.svelte";
  import { fly, fade } from "svelte/transition";
  import DashboardController from "@/actions/App/Http/Controllers/DashboardController";

  interface Props {
    isOpen: boolean;
    enableTransition?: boolean;
  }

  let { isOpen = $bindable(), enableTransition = false }: Props = $props();

  function closeSidebar() {
    isOpen = false;
  }
</script>

<!-- Mobile Sidebar (Off-canvas) -->
{#if isOpen}
  <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
    <div
      transition:fade
      class="fixed inset-0 bg-gray-900/80"
      aria-hidden="true"
      onclick={closeSidebar}
    ></div>

    <div transition:fly={{ x: -200 }} class="fixed inset-0 flex">
      <div class="relative mr-16 flex w-full max-w-xs flex-1">
        <div
          class="absolute top-0 left-full flex w-16 cursor-pointer justify-center pt-5"
        >
          <button onclick={closeSidebar} type="button" class="-m-2.5 p-2.5">
            <span class="sr-only">Close sidebar</span>
            <X className="size-6 text-zinc-50" />
          </button>
        </div>

        <div
          class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
        >
          <div class="flex h-16 shrink-0 items-center text-xl font-semibold">
            <div
              class="flex size-8 items-center justify-center rounded-md bg-zinc-900 text-center text-zinc-50"
            >
              S
            </div>
            <span class="ml-2">Svelte Starter Kit</span>
          </div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li>
                    <a
                      use:inertia
                      href={DashboardController.index().url}
                      class={{
                        "bg-zinc-100 text-blue-600":
                          $page.url === DashboardController.index().url,
                        "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600":
                          $page.url !== DashboardController.index().url,
                        "-mx-2 flex gap-x-3 rounded-md p-2 text-base font-semibold": true,
                      }}
                    >
                      <Home className="size-6 shrink-0" />
                      Dashboard
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Desktop Sidebar -->
{#if isOpen}
  <div
    transition:fly={{ x: -200, duration: enableTransition ? 300 : 0 }}
    class="hidden lg:fixed lg:inset-y-0 lg:top-16 lg:z-40 lg:flex lg:h-[calc(100vh-4rem)] lg:w-72 lg:flex-col"
  >
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-200 bg-white px-6 pb-4"
    >
      <!-- Sidebar content (logo removed as it is in header now, or kept if desired?
         User said "header over the sidebar", so Sidebar likely shouldn't duplicate the logo/brand if Header covers it.
         However, visually it might be cleaner to keep the list. I will remove the logo block from sidebar since it's likely redundant with the header logo above it.)
         Wait, if sidebar is BELOW header, header has logo. Sidebar having logo again is weird. I'll remove the logo from desktop sidebar.
    -->
      <nav class="mt-6 flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li>
                <a
                  use:inertia
                  href={DashboardController.index().url}
                  class={{
                    "bg-zinc-100 text-blue-600":
                      $page.url === DashboardController.index().url,
                    "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600":
                      $page.url !== DashboardController.index().url,
                    "flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold": true,
                  }}
                >
                  <Home className="size-6 shrink-0" />
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
{/if}
