# my-ao-contract

## Prerequisites

1. Make sure you have [Lua](https://www.lua.org/start.html#installing) and [LuaRocks](https://github.com/luarocks/luarocks/wiki/Download) installed.

2. Install [arweave](https://luarocks.org/modules/crookse/arweave) using LuaRocks for testing purposes.

    ```bash
    luarocks install arweave
    ```

3. Install [Lua Language Server](https://luals.github.io/#install) to make development easier, safer, and faster!. On VSCode, install extension: [sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)
    - **[Recommended]** Install AO & Busted addon using Lua Addon Manager. On VSCode, goto `View > Command Palette > Lua: Open Addon Manager`

## Usage

To install dependencies:

```bash
npm install
```

To run tests:

```bash
npm run test
```

To deploy contract:

```bash
npm run deploy
```
