# Agent Guidelines for tRPC Vue Example

## Build/Lint/Test Commands
- `npm run dev` - Start both server and client in development mode
- `npm run dev:server` - Start server only (tsx watch server/index.ts)
- `npm run dev:client` - Start client only (vite)
- `npm run build` - Build for production (vue-tsc && vite build)
- `npm run lint` - Run ESLint on .ts and .vue files
- `npm run lint:fix` - Auto-fix ESLint issues

## Code Style Guidelines
- **Indentation**: 4 spaces (enforced by ESLint)
- **Quotes**: Single quotes preferred
- **Semicolons**: Required (enforced by @typescript-eslint/semi)
- **Trailing commas**: Always on multiline arrays/objects
- **Object spacing**: Always use spaces inside braces `{ foo }`
- **Arrow functions**: Always use parentheses around parameters `(x) => x`

## TypeScript & Naming
- **Interfaces**: PascalCase with `I` prefix (e.g., `IUser`)
- **Type aliases**: PascalCase with `T` prefix (e.g., `TAppRouter`)
- **Strict mode**: Enabled, no explicit `any` allowed
- **Import order**: builtin → external → type → internal → index → parent → sibling

## Vue Specific
- **Template indentation**: 4 spaces, 1 space for attributes
- **Max attributes per line**: 3 for single-line, 1 for multiline
- **Attribute order**: LIST_RENDERING → CONDITIONALS → RENDER_MODIFIERS → etc.
- **Directives**: Use shorthand (`:` for `v-bind`, `@` for `v-on`)