/*!
 * Copyright 2026 Digital Bazaar, Inc.
 */
import {defineAsyncComponent, h} from 'vue';
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
 * The overlay renders as a sibling of the application's own root component,
 * so it is reachable on every page without app layout changes. Mount it by
 * wrapping the app's root render function; see `wrapRootRender()`.
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

  return app;
}

/**
 * Wraps a root render function so the dev-mode overlay renders alongside the
 * application's own root component.
 *
 * When dev mode is disabled, the original render function is returned
 * unchanged.
 *
 * @param {Function} render - The application's root render function.
 *
 * @returns {Function} The render function to use.
 */
export function wrapRootRender(render) {
  if(!isDevModeEnabled()) {
    return render;
  }

  // lazy-load the overlay shell as its own chunk; the import is only
  // referenced behind the flag, so production builds never fetch or execute it
  const overlay = defineAsyncComponent(() => import(
    /* webpackChunkName: "bedrock-vue-devmode" */
    '../components/DevModeOverlay.vue'));

  return () => [render(), h(overlay)];
}

export {getOverlayState};
