# bedrock-vue-devtools

Developer-mode overlay and devtools for [`bedrock-vue`][].

## Overview

The overlay gives a running application a developer-mode panel, reachable on
every page, that hosts registered tools. It ships with one built-in tool: a log
view fed by mirroring `console.*`, so existing logging anywhere in the stack
shows up with no code changes.

Everything is gated behind a dev-mode flag. When the flag is off, `install()`
is a no-op, the overlay chunk is never fetched, and `console.*` is left
untouched.

## Usage

Call `install()` with the application. The overlay mounts itself and teleports
its content into `document.body`, so it needs no change to the application's
layout or root render function:

```js
import {initialize} from '@bedrock/vue';
import {install} from '@bedrock/vue-devtools';
import MyApp from '../components/MyApp.vue';

initialize({
  async beforeMount({app}) {
    install(app);
    return MyApp;
  }
});
```

Register additional tools with `registerDevTool()`:

```js
import {registerDevTool} from '@bedrock/vue-devtools';

registerDevTool({id: 'my-tool', label: 'My tool', component: MyToolComponent});
```

A registered tool renders inside the overlay. It reads the overlay's own
registry rather than the host application's injected context, so it does not
receive values the host passes to `provide()`.

`createTapTrigger()` and `createTripleKeyDetector()` are opt-in helpers for
opening the overlay on touch devices and desktop respectively.

See [`docs/dev-mode-spec.md`](docs/dev-mode-spec.md) for the full design.

## Install

Not yet published.

[`bedrock-vue`]: https://github.com/digitalbazaar/bedrock-vue
