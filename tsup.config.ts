import { solidPlugin } from "esbuild-plugin-solid";
/**
 * Adapted from https://github.com/corvudev/corvu/blob/b1f36db096867a88ef5b62bec1e46cc0c8e09089/packages/corvu/tsup.config.ts
 */
import { type Options, defineConfig } from "tsup";

function generateConfig(jsx: boolean): Options {
	return {
		target: "esnext",
		platform: "browser",
		format: "esm",
		clean: true,
		dts: !jsx,
		entry: ["src/index.ts", "src/*/index.ts", "src/primitives/*/index.ts"],
		outDir: "dist/",
		treeshake: { preset: "smallest" },
		replaceNodeEnv: true,
		esbuildOptions(options) {
			if (jsx) {
				options.jsx = "preserve";
			}
			options.chunkNames = "[name]/[hash]";
			options.drop = ["console", "debugger"];
		},
		outExtension() {
			return jsx ? { js: ".jsx" } : {};
		},
		// @ts-ignore
		esbuildPlugins: !jsx ? [solidPlugin({ solid: { generate: "dom" }, typescript: { allowDeclareFields: true } })] : [],
	};
}

export default defineConfig([generateConfig(false), generateConfig(true)]);