# my-ao-contract

AO contract created using [create-ao-contract](https://github.com/pawanpaudel93/create-ao-contract) featuring [Busted](https://luarocks.org/modules/lunarmodules/busted) and [WAO](https://github.com/weavedb/wao) for testing and seamless deployment via [ao-deploy](https://github.com/pawanpaudel93/ao-deploy).

## Prerequisites

1. Make sure you have [Lua](https://www.lua.org/start.html#installing) and [LuaRocks](https://github.com/luarocks/luarocks/wiki/Download) installed.

2. Install [arweave](https://luarocks.org/modules/crookse/arweave) using LuaRocks for testing, formatting, and linting purposes.

   ```bash
   luarocks install arweave
   ```

   **Note**: `arweave` package relies on `busted` for its testing capabilities.

3. **[Recommended]** Install [Lua Language Server](https://luals.github.io/#install) to make development easier, safer, and faster!. On VSCode, install extension: [sumneko.lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)
   - Install AO & Busted addon using Lua Addon Manager. On VSCode, goto `View > Command Palette > Lua: Open Addon Manager`

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Usage

To run tests, use:

```bash
npm run test
```

To deploy the contract, use:

```bash
npm run deploy
```

To format the code, use:

```bash
npm run format
```

To lint the code, use:

```bash
npm run lint
```

## Contributing

If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Credits

This project was created using [create-ao-contract](https://github.com/pawanpaudel93/create-ao-contract).
