# bedrock-vue-devtools ChangeLog

## 1.0.0 - 2026-09-dd

### Added
- Initial repository.
- Developer-mode overlay shell, ported from bedrock-vue.
- `console.*` mirroring into the overlay, with a built-in log tool.
- `createTapTrigger()` and `createTripleKeyDetector()` overlay triggers.
- `install()` entry point. The overlay mounts itself and teleports into
  `document.body`, so it needs no change to the host application's root
  render function and works under `@bedrock/vue`'s `initialize()`.
