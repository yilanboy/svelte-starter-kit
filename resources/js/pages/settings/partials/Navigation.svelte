<script lang="ts">
  import { inertia, page } from "@inertiajs/svelte";
  import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
  import PasswordController from "@/actions/App/Http/Controllers/Settings/PasswordController";
</script>

<ul class="flex flex-col gap-1">
  <li>
    <a
      use:inertia
      href={ProfileController.edit().url}
      class={{
        "bg-zinc-100": $page.url === ProfileController.edit().url,
        "hover:bg-zinc-100": $page.url !== ProfileController.edit().url,
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
        "bg-zinc-100": $page.url === PasswordController.edit().url,
        "hover:bg-zinc-100": $page.url !== PasswordController.edit().url,
        "block rounded-md px-4 py-2 ": true,
      }}
    >
      Password
    </a>
  </li>
</ul>
