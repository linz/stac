# Toitū Te Whenua LINZ STAC Extensions

The
[SpatioTemporal Asset Catalog (STAC)](https://github.com/radiantearth/stac-spec)
family of specifications aim to standardize the way geospatial assets are
exposed online and queried.

This repository is for STAC Extensions that Toitū Te Whenua LINZ is working on.
These may become [STAC Community Extensions](https://github.com/stac-extensions)
if other data managers find them to be useful.

## Extensions

- [Camera](./extensions/camera): Camera details for photos.
- [Historical Imagery](./extensions/historical_imagery): Aerial survey photos.
- [LINZ](./extensions/linz): Toitū Te Whenua LINZ-specific settings.
- [Quality](./extensions/quality): Dataset accuracy.

## Development

Prerequisites:

- [Poetry](https://python-poetry.org/)
- [Yarn](https://yarnpkg.com/)

Follow these steps to set up a development environment with pre-commit hooks to
automatically verify the contents of files before committing:

1. Install packages:

   ```shell
   yarn
   poetry install
   ```

2. Enable pre-commit hooks:

   ```shell
   poetry run pre-commit install --overwrite
   ```

### Releases

To create a release run `yarn version --new-version <patch|minor|major>` which will create a change log and version tag.

Push this to master then the build pipeline will create a github release which will trigger the github pages to be published.

## Adding a new extension

Be sure to add a schemaMap entry to the
[validate.sh](validate.sh) file with your json-schema
`$id` url followed by the path to the json-schema locally. This will allow
pre-commit to use a local json-schema file rather than retrieving a possibly yet
un-published json-schema.

## [License](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

This work is licensed under a
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
