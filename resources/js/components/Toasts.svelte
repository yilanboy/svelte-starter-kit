<script lang="ts">
  import { onMount, setContext } from "svelte";
  import Toast from "@/components/Toast.svelte";

  interface ToastProps {
    id: string;
    show: boolean;
    message: string;
    description?: string;
    type?: "success" | "error" | "warning" | "info" | "danger" | "default";
    html?: boolean;
  }

  let toasts: ToastProps[] = $state([]);
  let toastsHovered = $state(false);
  let expanded = $state(false);
  let layout = $state("default");
  let position = $state("top-center");
  let paddingBetweenToasts = $state(15);

  let toastsContainer: HTMLUListElement;

  setContext("toasts", { deleteToastWithId, stackToasts });

  function deleteToastWithId(id: string) {
    for (let i = 0; i < toasts.length; i++) {
      if (toasts[i].id === id) {
        toasts.splice(i, 1);

        break;
      }
    }
  }

  function getToastWithId(id: string) {
    for (let i = 0; i < toasts.length; i++) {
      if (toasts[i].id === id) {
        return toasts[i];
      }
    }
  }

  function burnToast(id: string) {
    let burnToast = getToastWithId(id);

    if (!burnToast) return;

    let burnToastElement = document.getElementById(burnToast.id);

    if (burnToastElement) {
      if (toasts.length == 1) {
        if (layout == "default") {
          expanded = false;
        }

        burnToastElement.classList.remove("translate-y-0");

        if (position.includes("bottom")) {
          burnToastElement.classList.add("translate-y-full");
        } else {
          burnToastElement.classList.add("-translate-y-full");
        }

        burnToastElement.classList.add("-translate-y-full");
      }
      burnToastElement.classList.add("opacity-0");

      // let that = this;

      setTimeout(function () {
        // that.deleteToastWithId(id);
        deleteToastWithId(id);
        setTimeout(function () {
          // that.stackToasts();
          stackToasts();
        }, 1);
      }, 300);
    }
  }

  function stackToasts() {
    positionToasts();
    calculateHeightOfToastsContainer();

    // let that = this;

    setTimeout(function () {
      // that.calculateHeightOfToastsContainer();
      calculateHeightOfToastsContainer();
    }, 300);
  }

  function positionToasts() {
    if (toasts.length == 0) return;

    let topToast = document.getElementById(toasts[0].id);

    if (!topToast) return;

    topToast.style.zIndex = (100).toString();

    if (expanded) {
      if (position.includes("bottom")) {
        topToast.style.top = "auto";
        topToast.style.bottom = "0px";
      } else {
        topToast.style.top = "0px";
      }
    }

    let bottomPositionOfFirstToast = getBottomPositionOfElement(topToast);

    if (toasts.length == 1) return;
    let middleToast = document.getElementById(toasts[1].id);

    if (!middleToast) return;

    middleToast.style.zIndex = (90).toString();

    if (expanded) {
      let middleToastPosition =
        topToast.getBoundingClientRect().height + paddingBetweenToasts + "px";

      if (position.includes("bottom")) {
        middleToast.style.top = "auto";
        middleToast.style.bottom = middleToastPosition;
      } else {
        middleToast.style.top = middleToastPosition;
      }

      middleToast.style.scale = "100%";
      middleToast.style.transform = "translateY(0px)";
    } else {
      middleToast.style.scale = "94%";
      if (position.includes("bottom")) {
        middleToast.style.transform = "translateY(-16px)";
      } else {
        alignBottom(topToast, middleToast);
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

      if (position.includes("bottom")) {
        bottomToast.style.top = "auto";
        bottomToast.style.bottom = bottomToastPosition;
      } else {
        bottomToast.style.top = bottomToastPosition;
      }

      bottomToast.style.scale = "100%";
      bottomToast.style.transform = "translateY(0px)";
    } else {
      bottomToast.style.scale = "88%";
      if (position.includes("bottom")) {
        bottomToast.style.transform = "translateY(-32px)";
      } else {
        alignBottom(topToast, bottomToast);
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

      if (position.includes("bottom")) {
        burnToast.style.top = "auto";
        burnToast.style.bottom = burnToastPosition;
      } else {
        burnToast.style.top = burnToastPosition;
      }

      burnToast.style.scale = "100%";
      burnToast.style.transform = "translateY(0px)";
    } else {
      burnToast.style.scale = "82%";
      alignBottom(topToast, burnToast);
      burnToast.style.transform = "translateY(48px)";
    }

    if (!burnToast.firstElementChild) return;

    burnToast.firstElementChild.classList.remove("opacity-100");
    burnToast.firstElementChild.classList.add("opacity-0");

    // let that = this;

    // Burn 🔥 (remove) last toast
    setTimeout(function () {
      // that.toasts.pop();
      toasts.pop();
    }, 300);

    if (position.includes("bottom")) {
      middleToast.style.top = "auto";
    }

    return;
  }

  function alignBottom(element1: HTMLElement, element2: HTMLElement) {
    // Get the top position and height of the first element
    let top1 = element1.offsetTop;
    let height1 = element1.offsetHeight;

    // Get the height of the second element
    let height2 = element2.offsetHeight;

    // Calculate the top position for the second element
    let top2 = top1 + (height1 - height2);

    // Apply the calculated top position to the second element
    element2.style.top = top2 + "px";
  }

  function alignTop(element1: HTMLElement, element2: HTMLElement) {
    // Get the top position of the first element
    let top1 = element1.offsetTop;

    // Apply the same top position to the second element
    element2.style.top = top1 + "px";
  }

  function resetBottom() {
    for (let i = 0; i < toasts.length; i++) {
      if (document.getElementById(toasts[i].id)) {
        let toastElement = document.getElementById(toasts[i].id);
        if (!toastElement) return;
        toastElement.style.bottom = "0px";
      }
    }
  }

  function resetTop() {
    for (let i = 0; i < toasts.length; i++) {
      if (document.getElementById(toasts[i].id)) {
        let toastElement = document.getElementById(toasts[i].id);
        if (!toastElement) return;
        toastElement.style.top = "0px";
      }
    }
  }

  function getBottomPositionOfElement(el: HTMLElement) {
    return el.getBoundingClientRect().height + el.getBoundingClientRect().top;
  }

  function calculateHeightOfToastsContainer() {
    if (toasts.length == 0) {
      // $el.style.height = "0px";
      toastsContainer.style.height = "0px";

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
      if (position.includes("bottom")) {
        // $el.style.height =
        toastsContainer.style.height =
          firstToastRectangle.top +
          firstToastRectangle.height -
          lastToastRectangle.top +
          "px";
      } else {
        // $el.style.height =
        toastsContainer.style.height =
          lastToastRectangle.top +
          lastToastRectangle.height -
          firstToastRectangle.top +
          "px";
      }
    } else {
      // $el.style.height = firstToastRectangle.height + "px";
      toastsContainer.style.height = firstToastRectangle.height + "px";
    }
  }

  function onSetToastsLayout(event: CustomEvent) {
    layout = event.detail.layout;
    expanded = layout === "expanded";
    stackToasts();
  }

  function onToastShow(event: CustomEvent) {
    event.stopPropagation();

    if (event.detail.position) {
      position = event.detail.position;
    }

    toasts.unshift({
      id: "toast-" + Math.random().toString(16).slice(2),
      show: false,
      message: event.detail.message,
      description: event.detail.description,
      type: event.detail.type,
      html: event.detail.html,
    });
  }

  onMount(() => {
    if (layout == "expanded") {
      expanded = true;
    }

    stackToasts();
  });

  function openToast(
    message = "hello",
    options = {
      description: "",
      type: "default",
      position: "top-right",
      html: '<p class="p-4">Hello world!</p>',
    },
  ) {
    let description = "";
    let type = "default";
    let position = "top-center";
    let html = "";

    if (typeof options.description != "undefined")
      description = options.description;
    if (typeof options.type != "undefined") type = options.type;
    if (typeof options.position != "undefined") position = options.position;
    if (typeof options.html != "undefined") html = options.html;

    window.dispatchEvent(
      new CustomEvent("toast-show", {
        detail: {
          type: type,
          message: message,
          description: description,
          position: position,
          html: html,
        },
      }),
    );
  }

  $effect(() => {
    if (layout === "default") {
      if (position.includes("bottom")) {
        resetBottom();
      } else {
        resetTop();
      }

      if (toastsHovered) {
        // calculate the new positions
        expanded = true;
        if (layout === "default") {
          stackToasts();
        }
      } else {
        if (layout === "default") {
          expanded = false;
          //setTimeout(function(){
          stackToasts();
          //}, 10);
          setTimeout(function () {
            stackToasts();
          }, 10);
        }
      }
    }
  });
</script>

<svelte:window
  onset-toasts-layout={onSetToastsLayout}
  ontoast-show={onToastShow}
  onmouseenter={() => (toastsHovered = true)}
  onmouseleave={() => (toastsHovered = false)}
/>

<ul
  class={{
    "top-0 right-0 sm:mt-6 sm:mr-6": position === "top-right",
    "top-0 left-0 sm:mt-6 sm:ml-6": position === "top-left",
    "top-0 left-1/2 -translate-x-1/2 sm:mt-6": position === "top-center",
    "right-0 bottom-0 sm:mr-6 sm:mb-6": position === "bottom-right",
    "bottom-0 left-0 sm:mb-6 sm:ml-6": position === "bottom-left",
    "bottom-0 left-1/2 -translate-x-1/2 sm:mb-6": position === "bottom-center",
    "group fixed z-[99] block w-full sm:max-w-xs": true,
  }}
  bind:this={toastsContainer}
>
  {#each toasts as toast (toast.id)}
    <Toast {toasts} {toast} {position} />
  {/each}
</ul>

<button
  title="test"
  type="button"
  onclick={() => {
    openToast();
  }}>Test</button
>
