# Sveltekit-JavaScript-Repro
This is a reproduction of two distinct issues, though related by the fact they involve JavaScript in markup.

```bash
# Run in DEV mode, then visit localhost:3000
npm install
npm run dev
```

## Issue 1 (https://github.com/sveltejs/kit/issues/1653)
SvelteKit inserts HMR reload code in stringified JavaScript in DEV mode.
```html
<code>
{`
const product = 1 * 1;

export default product;
`.trim()}
</code>
```
Displays in the browser as
```javascript
const product = 1 * 1; import * as ___SVELTE_HMR_HOT_API from '/sveltekit-javascript-repro/node_modules/svelte-hmr/runtime/hot-api-esm.js';import { adapter as ___SVELTE_HMR_HOT_API_PROXY_ADAPTER } from '/sveltekit-javascript-repro/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js';if (import.meta && import.meta.hot) { if (false) import.meta.hot.accept(); product = ___SVELTE_HMR_HOT_API.applyHmr({ m: import.meta, id: "/sveltekit-javascript-repro/src/routes/index.svelte", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":true,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":true}, Component: product, ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER, acceptable: true, preserveLocalState: false, emitCss: true, }); } export default product;
```
Visit [localhost:3000](localhost:3000) for repro.

## Issue 2 (https://github.com/sveltejs/kit/issues/1653)
Vite thinks I'm including JSX and throws when I have JavaScript text in a component slot.
```svelte
<script>
    import Code from "$lib/components/Code.svelte";
</script>

<Code>
    const product = 1 * 1;

    console.log({"{"}product{"}"});

    export default product;
</Code>
```

Vite Error Output
```bash
7:41:30 PM [vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. If you are using JSX, make sure to name the file with the .jsx or .tsx extension.
  Plugin: vite:import-analysis
  File: /sveltekit-javascript-repro/src/routes/issue-2.svelte
  38 |                          t2 = text("product");
  39 |                          t3 = text(t3_value);
  40 |                          t4 = text(");\n\n    import * as ___SVELTE_HMR_HOT_API from '/sveltekit-javascript-repro/node_modules/svelte-hmr/runtime/hot-api-esm.js';import { adapter as ___SVELTE_HMR_HOT_API_PROXY_ADAPTER } from '/sveltekit-javascript-repro/node_modules/svelte-hmr/runtime/proxy-adapter-dom.js';if (import.meta && import.meta.hot) { if (false) import.meta.hot.accept(); product = ___SVELTE_HMR_HOT_API.applyHmr({ m: import.meta, id: "/sveltekit-javascript-repro/src/routes/issue-2.svelte", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":true,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":true}, Component: product, ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER, acceptable: true, preserveLocalState: false, emitCss: true, }); }
     |^
  41 |  export default product;
  42 |
      at formatError (/sveltekit-javascript-repro/node_modules/vite/dist/node/chunks/dep-cb562f8f.js:44553:46)
      at TransformContext.error (/sveltekit-javascript-repro/node_modules/vite/dist/node/chunks/dep-cb562f8f.js:44549:19)
      at TransformContext.transform (/sveltekit-javascript-repro/node_modules/vite/dist/node/chunks/dep-cb562f8f.js:69512:22)
      at async Object.transform (/sveltekit-javascript-repro/node_modules/vite/dist/node/chunks/dep-cb562f8f.js:44751:30)
      at async transformRequest (/sveltekit-javascript-repro/node_modules/vite/dist/node/chunks/dep-cb562f8f.js:59118:29)
      at async viteTransformMiddleware (/sveltekit-javascript-repro/node_modules/vite/dist/node/chunks/dep-cb562f8f.js:59256:32)
```

Note in the error that [Issue 1](issue-1) persists in the reproduction of Issue 2.

Visit [localhost:3000/issue-2](localhost:3000) for repro.

