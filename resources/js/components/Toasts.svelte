<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { fly } from "svelte/transition";

  interface ToastProps {
    id: string;
    show: boolean;
    message: string;
    description?: string;
    type?: "success" | "error" | "warning" | "info" | "danger" | "default";
    html?: boolean;
  }

  type Position =
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";

  let toasts: ToastProps[] = $state([]);
  let toastsHovered = $state(false);
  let expanded = $state(false);
  let layout = $state("default");
  let position: Position = $state("top-center");
  let paddingBetweenToasts = $state(15);

  let toastsContainer: HTMLUListElement;

  // setContext("toasts", { burnToast, deleteToastWithId, stackToasts });

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
    console.log("burnToast is triggered");
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

  // 初始化 toasts 與每次有 toast 新增時都會觸發
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
    // setTimeout(function () {
    //   // that.toasts.pop();
    //   toasts.pop();
    // }, 300);

    toasts.pop();

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

  // function alignTop(element1: HTMLElement, element2: HTMLElement) {
  //   // Get the top position of the first element
  //   let top1 = element1.offsetTop;
  //
  //   // Apply the same top position to the second element
  //   element2.style.top = top1 + "px";
  // }

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

  // 調整 toasts 的顯示方式，預設為折疊，可以改為展開
  function onSetToastsLayout(event: CustomEvent) {
    layout = event.detail.layout;
    expanded = layout === "expanded";
    stackToasts();
  }

  // 開始顯示 toasts，新增一個 toast 在 toasts 列表
  function onToastShow(event: CustomEvent) {
    event.stopPropagation();

    if (event.detail.position) {
      position = event.detail.position;
    }

    let toast = {
      id: "toast-" + crypto.randomUUID(),
      show: false,
      message: event.detail.message,
      description: event.detail.description,
      type: event.detail.type,
      html: event.detail.html,
    };

    toasts.unshift(toast);

    setTimeout(function () {
      deleteToastWithId(toast.id);
    }, 3000);
  }

  // 觸發 onToastShow 事件，新增一個 toast
  function popToast(
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

  // 原本 Alpine.js 版本這個是根據 toastsHovered 的值是否變化而觸發
  function onToastHoveredChange() {
    if (layout !== "default") return;

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

  $effect(() => {
    if (toasts.length > 0) {
      stackToasts();
    }
  });

  onMount(() => {
    if (layout == "expanded") {
      expanded = true;
    }

    stackToasts();
  });
</script>

<svelte:window
  onset-toasts-layout={onSetToastsLayout}
  ontoast-show={onToastShow}
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
  onmouseenter={() => {
    toastsHovered = true;
    onToastHoveredChange();
  }}
  onmouseleave={() => {
    toastsHovered = false;
    onToastHoveredChange();
  }}
  bind:this={toastsContainer}
>
  {#each toasts as toast (toast.id)}
    <li
      in:fly={{ y: -200, duration: 300 }}
      out:fly={{ y: -50, duration: 300, delay: 300 }}
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
  {/each}
</ul>

<button
  title="open toast"
  type="button"
  onclick={() => {
    popToast();
  }}>Open Toast</button
>

<button
  title="default"
  type="button"
  onclick={() => {
    expanded = false;
    window.dispatchEvent(
      new CustomEvent("set-toasts-layout", { detail: { layout: "default" } }),
    );
  }}>Default</button
>

<button
  title="expanded"
  type="button"
  onclick={() => {
    expanded = true;
    window.dispatchEvent(
      new CustomEvent("set-toasts-layout", { detail: { layout: "expanded" } }),
    );
  }}>Expanded</button
>
