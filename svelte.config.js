import adapter from "@sveltejs/adapter-static";

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        appDir: "app",
        adapter: adapter(),
        target: "#svelte",
    },
};
