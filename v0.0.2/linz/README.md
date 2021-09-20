# LINZ Top Level Extension Specification

- **Title:** LINZ Top Level Extension
- **Identifier:**
  <https://linz.github.io/stac/v0.0.2/linz/schema.json>
- **Field Name Prefix:** NONE
- **Scope:** Collection
- **Extension
  [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):**
  Proposal
- **Owner**: @billgeo @imincik @l0b0 @MitchellPaff

This is LINZ top level
[SpatioTemporal Asset Catalog](https://github.com/radiantearth/stac-spec) (STAC)
extension which adds constraints to default STAC schema properties.

- Examples:
  - [Collection example](examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
- [JSON Schema](json-schema/schema.json)
- [Changelog](./CHANGELOG.md)

## Item Properties and Collection Fields

| Field Name              | Type   | Description                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title                   | string | **REQUIRED**. Collection title.                                                                                                                                                                                                                                                                                                                  |
| security_classification | string | **REQUIRED**. New Zealand Government [Security Classification](https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/). Must be one of `Unclassified`, `IN-CONFIDENCE`, `SENSITIVE`, `RESTRICTED`, `CONFIDENTIAL`, `SECRET` or `TOP-SECRET`. |
| created                 | string | **REQUIRED**. Created Datetime.                                                                                                                                                                                                                                                                                                                  |
| updated                 | string | **REQUIRED**. Last updated Datetime.                                                                                                                                                                                                                                                                                                             |

## Contributing

All contributions are subject to the
[STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md).
For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md)
Instructions for running tests are copied here for convenience.

### Running tests

The same checks that run as checks on PR's are part of the repository and can be
run locally to verify that changes are valid. To run tests locally, you'll need
`npm`, which is a standard part of any
[node.js installation](https://nodejs.org/en/download/).

First you'll need to install everything with npm once. Just navigate to the root
of this repository and on your command line run:

```bash
npm install
```

Then to check markdown formatting and test the examples against the JSON schema,
you can run:

```bash
npm test
```

This will spit out the same texts that you see online, and you can then go and
fix your markdown or examples.

If the tests reveal formatting problems with the examples, you can fix them
with:

```bash
npm run format-examples
```
