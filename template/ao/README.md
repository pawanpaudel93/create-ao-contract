# my-ao-contract

AO contract created using [create-ao-contract](https://github.com/pawanpaudel93/create-ao-contract), featuring:

- 🧪 **Testing**: [Busted](https://luarocks.org/modules/lunarmodules/busted) and [WAO](https://github.com/weavedb/wao) for testing
- 🛠️ **Development Tools**: [arweave](https://github.com/crookse/arweave-lua) for testing, formatting and linting
- 📦 **Deployment**: Seamless deployment using [ao-deploy](https://github.com/pawanpaudel93/ao-deploy)

## Prerequisites

1. Install [Lua](https://www.lua.org/start.html#installing) and [LuaRocks](https://github.com/luarocks/luarocks/wiki/Download).

2. **Install Dependencies**:

   ```bash
   # Install Arweave Lua package
   luarocks install arweave

   # Install project dependencies
   npm install
   ```

   **Note**: `arweave` package relies on `busted` for its testing capabilities.

3. **IDE Setup (Recommended)**:
   - Install [VSCode](https://code.visualstudio.com/)
   - Add the [Lua Language Server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) extension.
   - Install AO & Busted addons via Command Palette (`View > Command Palette > Lua: Open Addon Manager`)

## Development

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

## Project Structure

```
my-ao-contract/
├── src/            # Contract source code
├── test/           # Test files
├── scripts/        # Utility scripts
├── aod.config.js   # ao-deploy configuration
└── package.json    # Project configuration
```

## Contributing

If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Acknowledgments

- Created using [create-ao-contract](https://github.com/pawanpaudel93/create-ao-contract)
- Built for [AO](https://ao.arweave.net/)
