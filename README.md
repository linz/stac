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

### Releases

To create a release:

1. Run `npm version --new-version <patch|minor|major>` which will create a change log commit and version tag.
2. Run `git push --atomic origin master TAG` (e.g. `git push --atomic origin master v0.0.14`) which will trigger a GitHub release job.
   This will publish the new version to the "gh-pages" branch.

## Adding a new extension

Be sure to add a schemaMap entry to the
[validate.sh](https://github.com/linz/stac/blob/master/validate.sh) file with your json-schema
`$id` url followed by the path to the json-schema locally. This will allow
`npm run test` to use a local json-schema file rather than retrieving a possibly yet
un-published json-schema.

## [License](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

This work is licensed under a
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
