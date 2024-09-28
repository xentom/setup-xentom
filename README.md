# Xentom CLI for GitHub Actions

Use this Action to install [`xentom`](https://xentom.com) on your actions runner. Works with Linux, Mac and Windows runners.

## Usage

```yaml
- uses: xentom/setup-xentom@v1
- name: Build and publish integration
  env:
    XENTOM_TOKEN: ${{ secrets.XENTOM_TOKEN }}
  run: |
    xentom build
    xentom publish --increment
```

Be sure to [set up a token](https://xentom.com/tokens) and add it to your repository secrets as `XENTOM_TOKEN`.

## Inputs

| Name      | Description                           | Default  | Examples          |
| --------- | ------------------------------------- | -------- | ----------------- |
| `version` | Version of the Xentom CLI to install. | `latest` | `canary`, `1.0.0` |

## Outputs

| Name           | Description                                        | Example                                                                       |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `version`      | Installed version of the Xentom CLI.               | `1.0.0`                                                                       |
| `path`         | Filesystem path where the Xentom CLI is installed. | `/path/to/xentom`                                                             |
| `download-url` | Download URL of the installed Xentom CLI.          | `https://github.com/xentom/cli/releases/latest/download/xentom-linux-x64.zip` |

## Development

Install the dependencies

```bash
bun install
```

Build the typescript and package it for distribution

```bash
bun run build
```

## License

The action is available as open source under the terms of the [Apache 2.0 License](https://opensource.org/license/apache-2-0/).
