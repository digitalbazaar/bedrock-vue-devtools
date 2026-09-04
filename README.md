# bedrock-vue-devtools

Developer-mode overlay and devtools for [`bedrock-vue`][].

## Status

Early. This package starts from the developer-mode overlay work in
[digitalbazaar/bedrock-vue#21][pr-21], which was closed in favor of a separate,
optionally installable package. Keeping the overlay out of core `bedrock-vue`
means major changes here do not force major releases across the stack.

Planned initial scope, ported from the `feature/dev-mode-overlay` branch:

- Developer-mode overlay shell.
- `createTapTrigger()` for opening the overlay on touch devices.
- `console.*` mirroring into the overlay.

One design question remains open before the port: whether this package needs a
new extension point in `bedrock-vue`, or whether the existing plugin API
suffices.

## Install

Not yet published.

[`bedrock-vue`]: https://github.com/digitalbazaar/bedrock-vue
[pr-21]: https://github.com/digitalbazaar/bedrock-vue/pull/21
