<script lang="ts">
  import LayoutMain from "@/components/layouts/main/LayoutMain.svelte";
  import { inertia } from "@inertiajs/svelte";
</script>

<LayoutMain>
  <main class="grow py-10">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-4 gap-6">
        <div class="col-span-4">
          <h2 class="text-2xl font-semibold">Update password</h2>
          <p class="text-zinc-500">
            Ensure your account is using a long, random password to stay secure
          </p>
        </div>

        <div class="col-span-1">
          <ul class="flex flex-col gap-1">
            <li>
              <a
                use:inertia
                href="/settings/profile"
                class="block rounded-md px-4 py-2 hover:bg-zinc-100"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                use:inertia
                href="/settings/password"
                class="block rounded-md px-4 py-2 hover:bg-zinc-100"
              >
                Password
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-3"></div>
      </div>
    </div>
  </main>
</LayoutMain>
