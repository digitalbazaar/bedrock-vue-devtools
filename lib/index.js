/*!
 * Copyright 2026 Digital Bazaar, Inc.
 */
import {createApp, defineAsyncComponent} from 'vue';
import {getOverlayState, registerDevTool} from './devTools.js';
import {installConsoleMirror} from './consoleMirror.js';
import {isDevModeEnabled} from './devMode.js';

// re-export the developer-mode public API (flag gate, tool-registration API,
// overlay toggle signal, console-mirror controls, and the opt-in trigger
// helpers)
export {
  createTapTrigger, createTripleKeyDetector, isDevModeEnabled
} from './devMode.js';
export {
  closeDevOverlay, getDevTools, openDevOverlay, registerDevTool,
  toggleDevOverlay, unregisterDevTool
} from './devTools.js';
export {
  clearDevLog, getDevLogEntries, installConsoleMirror, uninstallConsoleMirror
} from './consoleMirror.js';

/**
 * Installs the developer-mode overlay into a Vue application.
 *
 * When dev mode is disabled, this is a no-op: the overlay chunk is never
 * fetched and `console.*` is left untouched, so a production build pays
 * nothing for the import.
 *
 * The overlay mounts itself into `document.body` and teleports its content
 * there, so it is reachable on every page without the application wiring it
 * into its own component tree or changing its layout. This is what lets the
 * package work under `@bedrock/vue`'s `initialize()`, where the root render
 * function is fixed before the application gets a reference to the app.
 *
 * @param {object} app - The Vue application to install into.
 *
 * @returns {object} The `app`, for chaining.
 */
export function install(app) {
  if(!isDevModeEnabled()) {
    return app;
  }

  // mirror console.* into the overlay and auto-register the built-in log tool
  // that displays it; existing console.* calls anywhere in the stack then show
  // up with no changes
  installConsoleMirror();
  registerDevTool({
    id: 'dev-log',
    label: 'Log',
    component: defineAsyncComponent(() => import(
      /* webpackChunkName: "bedrock-vue-devmode" */
      '../components/DevLogTool.vue'))
  });

  /* Mount the overlay in its own Vue application, rather than inside the
  host's. The overlay teleports to `document.body`, so where its own root
  element sits in the DOM does not matter -- and a separate app keeps the
  host's root render function untouched, which is what `@bedrock/vue`'s
  `initialize()` requires: it fixes that function inside `bootstrap()` before
  the application ever sees the app object.

  The trade-off is that the overlay does not inherit the host app's
  `provide()` values or app-level config. Nothing needs them today: the
  overlay and its tools read the module-level registry in `devTools.js`. If a
  contributed tool ever needs the host's context, this is the seam to
  revisit. */
  const container = document.createElement('div');
  container.className = 'bedrock-vue-devtools-root';
  document.body.appendChild(container);

  // lazy-load the overlay shell as its own chunk; the import is only
  // referenced behind the flag, so production builds never fetch or execute it
  createApp(defineAsyncComponent(() => import(
    /* webpackChunkName: "bedrock-vue-devmode" */
    '../components/DevModeOverlay.vue'))).mount(container);

  return app;
}

export {getOverlayState};
