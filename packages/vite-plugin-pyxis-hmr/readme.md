# Pyxis HMR Plugin for Vite

This plugin enables hot module reload (HMR) functionality in Pyxis apps served
with Vite dev server.

## Constraints

For speed and simplicity, the plugin assumes your code follows certain patterns.
When the plugin fails to detect familiar code, the HMR functionality will be
disabled for the offending module.

- A component is any function or arrow function wrapped in the `component`
  factory imported from `@calmdown/pyxis`.
- Components must be exported.
- Modules without any components will not hot reload.
- Only components are hot reloaded, other symbols exported from a module remain
  static.

Furthermore, the plugin does *not* detect side effects. Such code will re-run
with each hot reload. Ideally, your components should each reside in their own
module without any side effects.
