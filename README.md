# VX Link Helper Landing

Static landing page and privacy policy site for **VX Link Helper**.

The site explains the extension, links to the source/release pages, and mirrors the extension's supported language set:

- English
- 简体中文
- 繁體中文
- Español
- العربية
- Português
- Français
- 日本語

## Privacy positioning

VX Link Helper is a local-only browser extension. The landing page should not claim that the extension sends links or user activity to a server. Store dashboards may provide aggregate installation or usage statistics, but runtime extension analytics should remain absent unless maintainers explicitly choose an opt-in design.

## Development

This is a lightweight static site: HTML, CSS, and vanilla JavaScript only.

Run locally with:

```bash
python3 -m http.server 8765 --directory /projects/VXLinkShareLanding
```

Then open `http://127.0.0.1:8765/index.html` and `http://127.0.0.1:8765/privacy.html`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

VX Link Helper Landing is open source under the **Mozilla Public License 2.0**. See [LICENSE](LICENSE).

The project name and logo are trademarks of the maintainers. The MPL-2.0 license covers the source code, but it does not grant permission to present unofficial sites or builds as the official VX Link Helper release.
