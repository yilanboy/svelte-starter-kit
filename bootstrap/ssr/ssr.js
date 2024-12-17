import { router, setupProgress } from "@inertiajs/core";
import escape from "html-escape";
import "lodash/cloneDeep.js";
import "lodash/isEqual.js";
import createServer from "@inertiajs/core/server";
const HYDRATION_START = "[";
const HYDRATION_END = "]";
const CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern = CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
const noop = () => {
};
function fallback(value, fallback2, lazy = false) {
  return value === void 0 ? lazy ? (
    /** @type {() => V} */
    fallback2()
  ) : (
    /** @type {V} */
    fallback2
  ) : value;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
var current_component = null;
function push(fn) {
  current_component = { p: current_component, c: null, d: null };
}
function pop() {
  var component = (
    /** @type {Component} */
    current_component
  );
  var ondestroy = component.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component.p;
}
const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
let on_destroy = [];
function render(component, options = {}) {
  const payload = { out: "", css: /* @__PURE__ */ new Set(), head: { title: "", out: "" } };
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  if (options.context) {
    push();
    current_component.c = options.context;
  }
  component(payload, options.props ?? {}, {}, {});
  if (options.context) {
    pop();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy) cleanup();
  on_destroy = prev_on_destroy;
  let head2 = payload.head.out + payload.head.title;
  for (const { hash, code } of payload.css) {
    head2 += `<style id="${hash}">${code}</style>`;
  }
  return {
    head: head2,
    html: payload.out,
    body: payload.out
  };
}
function head(payload, fn) {
  const head_payload = payload.head;
  head_payload.out += BLOCK_OPEN;
  fn(head_payload);
  head_payload.out += BLOCK_CLOSE;
}
function spread_props(props) {
  const merged_props = {};
  let key;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    for (key in obj) {
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (desc) {
        Object.defineProperty(merged_props, key, desc);
      } else {
        merged_props[key] = obj[key];
      }
    }
  }
  return merged_props;
}
function bind_props(props_parent, props_now) {
  var _a;
  for (const key in props_now) {
    const initial_value = props_parent[key];
    const value = props_now[key];
    if (initial_value === void 0 && value !== void 0 && ((_a = Object.getOwnPropertyDescriptor(props_parent, key)) == null ? void 0 : _a.set)) {
      props_parent[key] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
const h = (component, propsOrChildren, childrenOrKey, key = null) => {
  const hasProps = typeof propsOrChildren === "object" && propsOrChildren !== null && !Array.isArray(propsOrChildren);
  return {
    component,
    key: hasProps ? key : typeof childrenOrKey === "number" ? childrenOrKey : null,
    props: hasProps ? propsOrChildren : {},
    children: hasProps ? Array.isArray(childrenOrKey) ? childrenOrKey : childrenOrKey !== null ? [childrenOrKey] : [] : Array.isArray(propsOrChildren) ? propsOrChildren : propsOrChildren !== null ? [propsOrChildren] : []
  };
};
function Render($$payload, $$props) {
  push();
  let component = $$props["component"];
  let props = fallback($$props["props"], () => ({}), true);
  let children = fallback($$props["children"], () => [], true);
  let key = fallback($$props["key"], null);
  if (component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      if (children.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        component == null ? void 0 : component($$payload, spread_props([
          props,
          {
            children: ($$payload2) => {
              const each_array = ensure_array_like(children);
              $$payload2.out += `<!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let child = each_array[$$index];
                Render($$payload2, spread_props([child]));
                $$payload2.out += `<!---->`;
              }
              $$payload2.out += `<!--]-->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<!---->`;
        component == null ? void 0 : component($$payload, spread_props([props]));
        $$payload.out += `<!---->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { component, props, children, key });
  pop();
}
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe: subscribe2 };
}
const { set, subscribe } = writable();
const setPage = set;
function App($$payload, $$props) {
  push();
  let initialComponent = $$props["initialComponent"];
  let initialPage = $$props["initialPage"];
  let resolveComponent = $$props["resolveComponent"];
  let component = initialComponent;
  let key = null;
  let page = initialPage;
  let renderProps = resolveRenderProps(component, page, key);
  setPage(page);
  const isServer = typeof window === "undefined";
  if (!isServer) {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async (args) => {
        component = args.component;
        page = args.page;
        key = args.preserveState ? key : Date.now();
        renderProps = resolveRenderProps(component, page, key);
        setPage(page);
      }
    });
  }
  function resolveRenderProps(component2, page2, key2 = null) {
    const child = h(component2.default, page2.props, [], key2);
    const layout = component2.layout;
    return layout ? resolveLayout(layout, child, page2.props, key2) : child;
  }
  function resolveLayout(layout, child, pageProps, key2) {
    if (isLayoutFunction(layout)) {
      return layout(h, child);
    }
    if (Array.isArray(layout)) {
      return layout.slice().reverse().reduce((currentRender, layoutComponent) => h(layoutComponent, pageProps, [currentRender], key2), child);
    }
    return h(layout, pageProps, child ? [child] : [], key2);
  }
  function isLayoutFunction(layout) {
    return typeof layout === "function" && layout.length === 2 && typeof layout.prototype === "undefined";
  }
  Render($$payload, spread_props([renderProps]));
  bind_props($$props, {
    initialComponent,
    initialPage,
    resolveComponent
  });
  pop();
}
async function createInertiaApp({ id = "app", resolve, setup, progress = {}, page }) {
  const isServer = typeof window === "undefined";
  const el = isServer ? null : document.getElementById(id);
  const initialPage = page || JSON.parse((el == null ? void 0 : el.dataset.page) || "{}");
  const resolveComponent = (name) => Promise.resolve(resolve(name));
  const [initialComponent] = await Promise.all([
    resolveComponent(initialPage.component),
    router.decryptHistory().catch(() => {
    })
  ]);
  const props = { initialPage, initialComponent, resolveComponent };
  const svelteApp = setup({
    el,
    App,
    props
  });
  if (isServer) {
    const { html, head: head2, css } = svelteApp;
    return {
      body: `<div data-server-rendered="true" id="${id}" data-page="${escape(JSON.stringify(initialPage))}">${html}</div>`,
      head: [head2, css ? `<style data-vite-css>${css.code}</style>` : ""]
    };
  }
  if (progress) {
    setupProgress(progress);
  }
}
function Layout($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<main class="relative flex h-screen w-full flex-col items-center justify-center"><header class="absolute left-0 top-0 flex h-20 w-full items-center justify-center gap-6 text-lg"><a href="/" class="transition duration-150 hover:text-gray-600">Home</a> <a href="/about" class="transition duration-150 hover:text-gray-600">About</a></header> <article>`;
  children($$payload);
  $$payload.out += `<!----></article></main>`;
  pop();
}
function About($$payload, $$props) {
  let { title } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
  });
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<p class="mt-6 w-full text-center text-lg">It's a simple template of Inertia.js.</p> <p class="mt-6 w-full text-center text-lg">Use Svelte as the frontend, and Laravel as the backend</p>`;
    },
    $$slots: { default: true }
  });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
function Home($$payload, $$props) {
  let { title } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title)}</title>`;
  });
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<h1 class="text-4xl font-semibold">Use Inertia.js with Svelte and Laravel</h1>`;
    },
    $$slots: { default: true }
  });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({
        "./Pages/About.svelte": __vite_glob_0_0,
        "./Pages/Home.svelte": __vite_glob_0_1
      });
      return pages[`./Pages/${name}.svelte`];
    },
    setup({ App: App2, props }) {
      return render(App2, { props });
    }
  })
);
