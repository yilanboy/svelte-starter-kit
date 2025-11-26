<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import X from "@/components/icons/X.svelte";
  import CircleCheck from "@/components/icons/CircleCheck.svelte";
  import Info from "@/components/icons/Info.svelte";
  import TriangleAlert from "@/components/icons/TriangleAlert.svelte";
  import CircleAlert from "@/components/icons/CircleAlert.svelte";

  interface ToastProps {
    id: string;
    type?: "success" | "error" | "warning" | "info" | "danger" | "default";
    message?: string;
    description?: string;
    html?: string;
  }

  type ToastsLayout = "default" | "expanded";

  type ToastsPosition =
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";

  let toasts: ToastProps[] = $state([]);
  let toastsHovered = $state(false);
  let expanded = $state(false);
  let layout: ToastsLayout = $state("default");
  let position: ToastsPosition = $state("top-center");
  let paddingBetweenToasts = $state(15);

  let toastsContainer: HTMLUListElement;

  function deleteToastWithId(id: string) {
    for (let i = 0; i < toasts.length; i++) {
      if (toasts[i].id === id) {
        toasts.splice(i, 1);

        break;
      }
    }
  }

  function burnToast(id: string) {
    let burnToastElement = document.getElementById(id);

    if (!burnToastElement) return;

    if (toasts.length == 1) {
      if (layout == "default") {
        expanded = false;
      }
    }

    burnToastElement.style.opacity = "0";

    setTimeout(function () {
      deleteToastWithId(id);

      requestAnimationFrame(stackToasts);
    }, 300);
  }

  function stackToasts() {
    positionToasts();
    calculateHeightOfToastsContainer();

    setTimeout(function () {
      calculateHeightOfToastsContainer();
    }, 300);
  }

  function positionToasts() {
    // If there is no toast, don't do anything'
    if (toasts.length == 0) return;

    let topToast = document.getElementById(toasts[0].id);
    if (!topToast) return;

    topToast.style.zIndex = (100).toString();

    // if toasts are in expanded mode, set top to 0
    if (expanded) {
      if (position.startsWith("bottom")) {
        topToast.style.top = "auto";
        topToast.style.bottom = "0";
      } else {
        topToast.style.top = "0";
      }
    }

    if (toasts.length == 1) return;

    let middleToast = document.getElementById(toasts[1].id);
    if (!middleToast) return;

    middleToast.style.zIndex = (90).toString();

    if (expanded) {
      let middleToastPosition =
        topToast.getBoundingClientRect().height + paddingBetweenToasts + "px";

      if (position.startsWith("bottom")) {
        middleToast.style.top = "auto";
        middleToast.style.bottom = middleToastPosition;
      } else {
        middleToast.style.top = middleToastPosition;
      }

      middleToast.style.scale = "100%";
      middleToast.style.transform = "translateY(0)";
    } else {
      middleToast.style.scale = "94%";

      if (position.startsWith("bottom")) {
        middleToast.style.transform = "translateY(-16px)";
      } else {
        middleToast.style.transform = "translateY(16px)";
      }
    }

    if (toasts.length == 2) return;

    let bottomToast = document.getElementById(toasts[2].id);
    if (!bottomToast) return;

    bottomToast.style.zIndex = (80).toString();

    if (expanded) {
      let bottomToastPosition =
        topToast.getBoundingClientRect().height +
        paddingBetweenToasts +
        middleToast.getBoundingClientRect().height +
        paddingBetweenToasts +
        "px";

      if (position.startsWith("bottom")) {
        bottomToast.style.top = "auto";
        bottomToast.style.bottom = bottomToastPosition;
      } else {
        bottomToast.style.top = bottomToastPosition;
      }

      bottomToast.style.scale = "100%";
      bottomToast.style.transform = "translateY(0)";
    } else {
      bottomToast.style.scale = "88%";

      if (position.startsWith("bottom")) {
        bottomToast.style.transform = "translateY(-32px)";
      } else {
        bottomToast.style.transform = "translateY(32px)";
      }
    }

    if (toasts.length == 3) return;

    let burnToast = document.getElementById(toasts[3].id);

    if (!burnToast) return;

    burnToast.style.zIndex = (70).toString();

    if (expanded) {
      let burnToastPosition =
        topToast.getBoundingClientRect().height +
        paddingBetweenToasts +
        middleToast.getBoundingClientRect().height +
        paddingBetweenToasts +
        bottomToast.getBoundingClientRect().height +
        paddingBetweenToasts +
        "px";

      if (position.startsWith("bottom")) {
        burnToast.style.top = "auto";
        burnToast.style.bottom = burnToastPosition;
      } else {
        burnToast.style.top = burnToastPosition;
      }

      burnToast.style.scale = "100%";
      burnToast.style.transform = "translateY(0)";
    } else {
      burnToast.style.scale = "82%";
      burnToast.style.transform = "translateY(48px)";
    }

    burnToast.style.opacity = "0";

    toasts.pop();

    if (position.startsWith("bottom")) {
      middleToast.style.top = "auto";
    }

    return;
  }

  // Reset bottom when mouse hovers toasts container
  function resetBottom() {
    for (let i = 0; i < toasts.length; i++) {
      if (document.getElementById(toasts[i].id)) {
        let toastElement = document.getElementById(toasts[i].id);
        if (!toastElement) continue;
        toastElement.style.bottom = "0";
      }
    }
  }

  // Reset top when mouse hovers toasts container
  function resetTop() {
    for (let i = 0; i < toasts.length; i++) {
      if (document.getElementById(toasts[i].id)) {
        let toastElement = document.getElementById(toasts[i].id);
        if (!toastElement) continue;
        toastElement.style.top = "0";
      }
    }
  }

  function calculateHeightOfToastsContainer() {
    if (toasts.length == 0) {
      toastsContainer.style.height = "0";

      return;
    }

    let lastToast = toasts[toasts.length - 1];
    let lastToastElement = document.getElementById(lastToast.id);

    if (!lastToastElement) return;

    let lastToastRectangle = lastToastElement.getBoundingClientRect();

    let firstToast = toasts[0];

    let firstToastElement = document.getElementById(firstToast.id);

    if (!firstToastElement) return;

    let firstToastRectangle = firstToastElement.getBoundingClientRect();

    if (toastsHovered) {
      if (position.startsWith("bottom")) {
        toastsContainer.style.height =
          firstToastRectangle.top +
          firstToastRectangle.height -
          lastToastRectangle.top +
          "px";
      } else {
        toastsContainer.style.height =
          lastToastRectangle.top +
          lastToastRectangle.height -
          firstToastRectangle.top +
          "px";
      }
    } else {
      toastsContainer.style.height = firstToastRectangle.height + "px";
    }
  }

  // Change toasts layout to expanded or default
  function onSetToastsLayout(event: CustomEvent) {
    layout = event.detail.layout;
    expanded = layout === "expanded";
    stackToasts();
  }

  // Start to show toasts, add a toast to toasts
  function onShowToast(event: CustomEvent) {
    event.stopPropagation();

    if (event.detail.position) {
      position = event.detail.position;
    }

    let toast = {
      id: "toast-" + crypto.randomUUID(),
      type: event.detail.type,
      message: event.detail.message,
      description: event.detail.description,
      html: event.detail.html,
    };

    toasts.unshift(toast);

    requestAnimationFrame(stackToasts);

    // delete the toast after 6 seconds
    setTimeout(function () {
      deleteToastWithId(toast.id);
    }, 6000);
  }

  function onMouseEnterToastsContainer() {
    toastsHovered = true;

    if (layout !== "default") return;

    if (position.startsWith("bottom")) {
      resetBottom();
    } else {
      resetTop();
    }

    expanded = true;
    stackToasts();
  }

  function onMouseLeaveToastsContainer() {
    toastsHovered = false;

    if (layout !== "default") return;

    if (position.startsWith("bottom")) {
      resetBottom();
    } else {
      resetTop();
    }

    expanded = false;
    stackToasts();
  }

  onMount(() => {
    if (layout == "expanded") {
      expanded = true;
    }

    stackToasts();
  });
</script>

<svelte:window
  onset-toasts-layout={onSetToastsLayout}
  onshow-toast={onShowToast}
/>

<ul
  class={{
    "top-0 right-0 sm:mt-6 sm:mr-6": position === "top-right",
    "top-0 left-0 sm:mt-6 sm:ml-6": position === "top-left",
    "top-0 left-1/2 -translate-x-1/2 sm:mt-6": position === "top-center",
    "right-0 bottom-0 sm:mr-6 sm:mb-6": position === "bottom-right",
    "bottom-0 left-0 sm:mb-6 sm:ml-6": position === "bottom-left",
    "bottom-0 left-1/2 -translate-x-1/2 sm:mb-6": position === "bottom-center",
    "fixed z-99 block w-full sm:max-w-xs": true,
  }}
  onmouseenter={onMouseEnterToastsContainer}
  onmouseleave={onMouseLeaveToastsContainer}
  bind:this={toastsContainer}
>
  {#each toasts as toast (toast.id)}
    <li
      in:fly={{
        y: position.startsWith("bottom") ? 50 : -50,
        duration: 300,
        opacity: 1,
      }}
      out:fly={{ y: -50, duration: 300, delay: 300, opacity: 0 }}
      id={toast.id}
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
        {#if toast.html}
          <div>{@html toast.html}</div>
        {:else}
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
              {#if toast.type === "success"}
                <CircleCheck className="size-4 mr-2 -ml-1" />
              {:else if toast.type === "info"}
                <Info className="size-4 mr-2 -ml-1" />
              {:else if toast.type === "warning"}
                <TriangleAlert className="size-4 mr-2 -ml-1" />
              {:else if toast.type === "danger"}
                <CircleAlert className="size-4 mr-2 -ml-1" />
              {/if}
              <p class="text-base leading-none font-medium text-gray-800">
                {toast.message}
              </p>
            </div>

            {#if toast.description}
              <p
                class={{
                  "pl-5.5": toast.type !== "default",
                  "mt-1.5 text-sm leading-none opacity-70": true,
                }}
              >
                {toast.description}
              </p>
            {/if}
          </div>
        {/if}

        <button
          aria-label="Dismiss notification"
          type="button"
          onclick={() => {
            burnToast(toast.id);
          }}
          class={{
            "top-1/2 -translate-y-1/2": !toast.description && !toast.html,
            "top-0 mt-2.5": toast.description || toast.html,
            "absolute right-0 mr-2.5 cursor-pointer rounded-full p-1.5 text-gray-400 opacity-0 transition duration-100 ease-in-out group-hover:opacity-100 hover:bg-gray-50 hover:text-gray-500": true,
          }}
        >
          <X className="size-4" />
        </button>
      </span>
    </li>
  {/each}
</ul>
