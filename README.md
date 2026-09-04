# bedrock-vue-devtools

Developer-mode overlay and devtools for [`bedrock-vue`][].

## Status

Work in progress. This package carries the developer-mode overlay work from
[digitalbazaar/bedrock-vue#21][pr-21], which was closed in favor of a separate,
optionally installable package. Keeping the overlay out of core `bedrock-vue`
means major changes here do not force major releases across the stack.

The port is on the `port-from-bedrock-vue` branch and is not yet reviewed or
published.

## Overview

The overlay gives a running application a developer-mode panel, reachable on
every page, that hosts registered tools. It ships with one built-in tool: a log
view fed by mirroring `console.*`, so existing logging anywhere in the stack
shows up with no code changes.

Everything is gated behind a dev-mode flag. When the flag is off, `install()`
and `wrapRootRender()` are no-ops, the overlay chunk is never fetched, and
`console.*` is left untouched.

## Usage

The overlay mounts as a sibling of the application's own root component:

```js
import {install, wrapRootRender} from '@bedrock/vue-devtools';
import {createApp, h} from 'vue';

const app = createApp({
  render: wrapRootRender(() => h(RootComponent))
});
install(app);
```

Register additional tools with `registerDevTool()`:

```js
import {registerDevTool} from '@bedrock/vue-devtools';

registerDevTool({id: 'my-tool', label: 'My tool', component: MyToolComponent});
```

`createTapTrigger()` and `createTripleKeyDetector()` are opt-in helpers for
opening the overlay on touch devices and desktop respectively.

See [`docs/dev-mode-spec.md`](docs/dev-mode-spec.md) for the full design.

## Open questions

- **Integration seam.** On the original branch the overlay was wired directly
  into `bootstrap()` in core `bedrock-vue`. This port replaces that with
  `install()` plus `wrapRootRender()`, called by the application. Whether core
  should instead expose a root-sibling registration hook — so applications do
  not have to wrap their own render function — is still open.
- **Publishing.** Package name, initial version, and whether this ships under
  the `@bedrock` scope are not settled.

## Install

Not yet published.

[`bedrock-vue`]: https://github.com/digitalbazaar/bedrock-vue
[pr-21]: https://github.com/digitalbazaar/bedrock-vue/pull/21
