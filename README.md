# Create AO Contract

A CLI to create an AO contract.

## Usage

### Interactive

To scaffold an AO contract interactively, run the following command based on your package manager of choice:

### npm

```bash
npx create-ao-contract@latest
# or
npm create ao-contract@latest
```

### yarn

```bash
yarn create ao-contract
```

### pnpm

```bash
pnpm create ao-contract@latest
```

### bun

```bash
bunx create-ao-contract@latest
# or
bun create ao-contract@latest
```

During the interactive setup, you'll be prompted for your project's name and other configuration options. Provide your choices to create a new AO contract.

> **Note:** For windows users using a secure shell, ensure your ssh-agent is running as expected for successfull installation of dependencies.

### Non-interactive

For a non-interactive setup, use command line arguments. You can view available options with:

```bash
create-ao-contract --help
```

```bash
Usage: create-ao-contract [dir] [options]

A CLI for creating an AO contract

Arguments:
  dir            The name of the contract, as well as the name of the directory to create

Options:
  --noGit        Explicitely tell the CLI to not initialize a new git repo in the project (default: false)
  --noInstall    Explicitely tell the CLI to not run the package manager's install command (default: false)
  -y, --default  Bypass the CLI and Use default options to bootstrap a new AO contract. Note: Default options can be overridden by user-provided options.
                 (default: false)
  -v, --version  Display the version number
  -h, --help     display help for command
```

You can quickly scaffold an AO contract using the CLI with the default options by running:

```bash
npx create-ao-contract@latest -y
# or
yarn create ao-contract -y
# or
pnpm create ao-contract@latest -y
# or
bunx create-ao-contract@latest -y
```

You can also quickly scaffold by overriding the default options by passing the other options as well:

```bash
npx create-ao-contract@latest my-ao-contract --noGit --default
# or
yarn create ao-contract my-ao-contract --noGit --default
# or
pnpm create ao-contract@latest my-ao-contract --noGit --default
# or
bunx create-ao-contract@latest my-ao-contract --noGit --default
```

## Credits

For a complete list of contributors and credits, please see the [CREDITS](https://github.com/pawanpaudel93/create-ao-contract/blob/main/CREDITS.md) file.

## License

This project is licensed under the [MIT License](https://github.com/pawanpaudel93/create-ao-contract/blob/main/LICENSE).
