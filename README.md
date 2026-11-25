# Toitū Te Whenua LINZ STAC Extensions

The
[SpatioTemporal Asset Catalog (STAC)](https://github.com/radiantearth/stac-spec)
family of specifications aim to standardize the way geospatial assets are
exposed online and queried.

This repository is for STAC Extensions that Toitū Te Whenua LINZ is working on.
These may become [STAC Community Extensions](https://github.com/stac-extensions)
if other data managers find them to be useful.

## Extensions

- [Aerial Photography](./extensions/aerial-photo): Aerial photography details for photos.
- [Camera](./extensions/camera): Camera details for photos.
- [Film](./extensions/film): Film details for photos.
- [Historical Imagery](./extensions/historical-imagery): Aerial survey photos.
- [LINZ](./extensions/linz): Toitū Te Whenua LINZ-specific settings.
- [Quality](./extensions/quality): Dataset accuracy.
- [Scanning](./extensions/scanning): Scanning details for photos.

## Running tests

1. Install packages:

```shell
npm install
```

2. Run tests:

```shell
npm run test
```

## Development

Install packages by running `npm install`.

Verify changes by running `npm run lint && npm run test` before committing.

Use [Conventional Commits](https://www.conventionalcommits.org/) for pull request titles, as they are used to
work out the next version and to write the changelogs. Changes are added to an extension's changelog based on
the files they touch, so a scope is optional, but it helps readers, e.g. `feat(linz): add linz:example field`.

### Releases

Releases are managed by [release-please](https://github.com/googleapis/release-please):

1. When pull requests are merged to `master`, release-please opens or updates a `release: x.y.z` pull request
   listing the unreleased changes.
2. Merging the release pull request updates the root [CHANGELOG.md](CHANGELOG.md), plus the `CHANGELOG.md` and
   `version.txt` of each extension that changed, then creates the version tags and GitHub releases. Each extension
   has its own version (tagged e.g. `linz-v0.2.0`). The repository version (tagged e.g. `v0.1.5`) increases with
   every release.
3. The release then publishes all extensions to a new folder named after the repository version (e.g. `/v0.1.5/`)
   on the `gh-pages` branch, and regenerates the [stac.linz.govt.nz](https://stac.linz.govt.nz) homepage from this
   README, with the extension links pointing to the new folder. Previously published versions are never changed.

The homepage is generated from the repository [README.md](https://github.com/linz/stac/blob/master/README.md) on
each release, so don't edit `README.md` on the `gh-pages` branch by hand.
[Edit the repository README](https://github.com/linz/stac/edit/master/README.md) instead.

The changelogs, `version.txt` files and `.release-please-manifest.json` are managed by release-please, so don't
edit them by hand.

## Adding a new extension

Be sure to add a schemaMap entry to the
[validate.sh](https://github.com/linz/stac/blob/master/validate.sh) file with your json-schema
`$id` url followed by the path to the json-schema locally. This will allow
`npm run test` to use a local json-schema file rather than retrieving a possibly yet
un-published json-schema.

Add the extension to the [Extensions](#extensions) list above to include it on the
[stac.linz.govt.nz](https://stac.linz.govt.nz) homepage.

<<<<<<< HEAD
## [License](https://github.com/linz/stac/blob/master/LICENSE)
=======
Add the extension to release-please so it gets its own changelog:

- add a package for `extensions/<name>` with its `component` in
  [release-please-config.json](release-please-config.json), and add the component to the `linked-versions` plugin
- add `extensions/<name>` to [.release-please-manifest.json](.release-please-manifest.json) with the current version
- add `extensions/<name>/version.txt` containing the current version

## [License](LICENSE)
>>>>>>> 08bb54d (docs: update README)

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

This work is licensed under a
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
