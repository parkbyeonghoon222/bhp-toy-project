import { join, resolve } from "node:path";

/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
export default {
  port: 3000,
  hostname: "localhost",
  mode: "render",
  sassOptions: {
    includePaths: [join(resolve(), "src/shared/common/style")],
    additionalData: `@import "base";`,
  },
  clientEntry: "./src/app",
  serverEntry: "./src/app/server",
  watchToReloadPaths: ["./src"],
};
