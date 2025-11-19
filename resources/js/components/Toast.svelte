<script lang="ts">
  import { onMount, getContext } from "svelte";

  let toastHovered = $state(false);

  interface Toast {
    id: string;
    show: boolean;
    message: string;
    description?: string;
    type?: "success" | "error" | "warning" | "info" | "danger" | "default";
    html?: boolean;
  }

  interface Props {
    toasts: Toast[];
    toast: Toast;
    position: string;
  }

  interface Context {
    burnToast: (id: string) => void;
    deleteToastWithId: (id: string) => void;
    stackToasts: () => void;
  }

  const { burnToast, deleteToastWithId, stackToasts }: Context =
    getContext("toasts");

  let toastContainer: HTMLLIElement;

  let { toasts, toast, position }: Props = $props();

  onMount(() => {
    if (!toastContainer.firstElementChild) return;

    if (position.includes("bottom")) {
      toastContainer.firstElementChild.classList.add("toast-bottom");
      toastContainer.firstElementChild.classList.add(
        "opacity-0",
        "translate-y-full",
      );
    } else {
      toastContainer.firstElementChild.classList.add(
        "opacity-0",
        "-translate-y-full",
      );
    }

    setTimeout(function () {
      setTimeout(function () {
        if (!toastContainer.firstElementChild) return;

        if (position.includes("bottom")) {
          toastContainer.firstElementChild.classList.remove(
            "opacity-0",
            "translate-y-full",
          );
        } else {
          toastContainer.firstElementChild.classList.remove(
            "opacity-0",
            "-translate-y-full",
          );
        }
        toastContainer.firstElementChild.classList.add(
          "opacity-100",
          "translate-y-0",
        );

        setTimeout(function () {
          stackToasts();
        }, 10);
      }, 5);
    }, 50);

    setTimeout(function () {
      setTimeout(function () {
        if (!toastContainer.firstElementChild) return;

        toastContainer.firstElementChild.classList.remove("opacity-100");
        toastContainer.firstElementChild.classList.add("opacity-0");
        if (toasts.length == 1) {
          toastContainer.firstElementChild.classList.remove("translate-y-0");
          toastContainer.firstElementChild.classList.add("-translate-y-full");
        }
        setTimeout(function () {
          deleteToastWithId(toast.id);
        }, 300);
      }, 5);
    }, 4000);
  });
</script>

<li
  bind:this={toastContainer}
  id={toast.id}
  onmouseover={() => (toastHovered = true)}
  onfocus={() => (toastHovered = true)}
  onmouseout={() => (toastHovered = false)}
  onblur={() => (toastHovered = false)}
  class={{
    "toast-no-description": !toast.description,
    "absolute w-full duration-300 ease-out select-none sm:max-w-xs": true,
  }}
>
  <span
    class={{
      "p-4": !toast.html,
      "p-0": toast.html,
      "group relative flex w-full flex-col items-start border border-gray-100 bg-white shadow-[0_5px_15px_-3px_rgb(0_0_0_/_0.08)] transition-all duration-300 ease-out sm:max-w-xs sm:rounded-md": true,
    }}
  >
    {#if !toast.html}
      <div class="relative">
        <div
          class={{
            "text-green-500": toast.type === "success",
            "text-blue-500": toast.type === "info",
            "text-orange-400": toast.type === "warning",
            "text-red-500": toast.type === "danger",
            "text-gray-800": toast.type === "default",
            "flex items-center": true,
          }}
        >
          <p class="text-[13px] leading-none font-medium text-gray-800">
            {toast.message}
          </p>
        </div>
        {#if toast.description}
          <p
            class={{
              "pl-5": toast.type !== "default",
              "mt-1.5 text-xs leading-none opacity-70": true,
            }}
          >
            {toast.description}
          </p>
        {/if}
      </div>
    {/if}
    {#if toast.html}
      <div>{@html toast.html}</div>
    {/if}
    <button
      title="burn-toast"
      type="button"
      onclick={() => {
        burnToast(toast.id);
      }}
      class={{
        "top-1/2 -translate-y-1/2": !toast.description && !toast.html,
        "top-0 mt-2.5": toast.description || toast.html,
        "opacity-100": toastHovered,
        "opacity-0": !toastHovered,
        "absolute right-0 mr-2.5 cursor-pointer rounded-full p-1.5 text-gray-400 opacity-0 duration-100 ease-in-out hover:bg-gray-50 hover:text-gray-500": true,
      }}
    >
      <svg
        class="h-3 w-3"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path></svg
      >
    </button>
  </span>
</li>
