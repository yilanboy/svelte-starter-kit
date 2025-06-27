<script lang="ts">
  import { inertia, page } from "@inertiajs/svelte";
  import ProfileController from "@/actions/App/Http/Controllers/ProfileController";
  import PasswordController from "@/actions/App/Http/Controllers/PasswordController";
</script>

<ul class="flex flex-col gap-1">
  <li>
    <a
      use:inertia
      href={ProfileController.edit().url}
      class={{
        "bg-zinc-100": $page.url === "/settings/profile",
        "hover:bg-zinc-100": $page.url !== "/settings/profile",
        "block rounded-md px-4 py-2 ": true,
      }}
    >
      Profile
    </a>
  </li>
  <li>
    <a
      use:inertia
      href={PasswordController.edit().url}
      class={{
        "bg-zinc-100": $page.url === "/settings/password",
        "hover:bg-zinc-100": $page.url !== "/settings/password",
        "block rounded-md px-4 py-2 ": true,
      }}
    >
      Password
    </a>
  </li>
</ul>
