# bedrock-vue-devtools ChangeLog

## 1.0.0 - 2026-09-dd

### Added
- Initial repository.
- Developer-mode overlay shell, ported from bedrock-vue.
- `console.*` mirroring into the overlay, with a built-in log tool.
- `createTapTrigger()` and `createTripleKeyDetector()` overlay triggers.
- `install()` and `wrapRootRender()` entry points, replacing the direct
  `bootstrap()` integration used while this lived in core bedrock-vue.
