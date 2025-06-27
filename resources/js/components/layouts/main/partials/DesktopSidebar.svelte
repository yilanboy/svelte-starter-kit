<script lang="ts">
  import Home from "@/components/icons/Home.svelte";
  import { inertia, page } from "@inertiajs/svelte";
  import DashboardController from "@/actions/App/Http/Controllers/DashboardController";
</script>

<!-- Static sidebar for desktop -->
<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
  <!-- Sidebar component, swap this element with another sidebar if you like -->
  <div
    class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-200 bg-zinc-50 px-6 pb-4"
  >
    <div class="flex h-16 shrink-0 items-center gap-2 text-xl font-semibold">
      <div
        class="flex size-8 items-center justify-center rounded-md bg-zinc-900 text-center text-zinc-50"
      >
        S
      </div>
      <span>Svelte Starter Kit</span>
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
                  "bg-zinc-100 text-blue-600": $page.url === "/dashboard",
                  "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600":
                    $page.url !== "/dashboard",
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
