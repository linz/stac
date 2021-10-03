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
- [Historical Imagery](./extensions/historical_imagery): Aerial survey photos.
- [LINZ](./extensions/linz): Toitū Te Whenua LINZ-specific settings.
- [Quality](./extensions/quality): Dataset accuracy.
- [Scanning](./extensions/scanning): Scanning details for photos.

## Running tests

1. Install packages:

   ```shell
   yarn
   ```

2. Validate examples and non-examples:

   ```shell
   yarn validate
   yarn test
   ```

## Development

Install packages by running `yarn`.

Verify changes by running `yarn lint && yarn validate` before committing.

### Releases

To create a release run `yarn version --new-version <patch|minor|major>` which will create a change log and version tag.

`git push --atomic origin master TAG` then the build pipeline will create a github release which will trigger the github pages to be published.

## Adding a new extension

Be sure to add a schemaMap entry to the
[validate.sh](validate.sh) file with your json-schema
`$id` url followed by the path to the json-schema locally. This will allow
`yarn validate` to use a local json-schema file rather than retrieving a possibly yet
un-published json-schema.

## [License](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

This work is licensed under a
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
