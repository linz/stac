# LINZ Top Level Extension Specification

- **Title:** LINZ Top Level Extension
- **Identifier:**
  <https://linz.github.io/stac/v0.0.5/linz/schema.json>
- **Field Name Prefix:** linz
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
- [JSON Schema](./schema.json)
- [Changelog](./CHANGELOG.md)

## Item Properties and Collection Fields

| Field Name                   | Type   | Description                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title                        | string | **REQUIRED**. Collection title.                                                                                                                                                                                                                                                                                                                  |
| linz:security_classification | string | **REQUIRED**. New Zealand Government [Security Classification](https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/). Must be one of `Unclassified`, `IN-CONFIDENCE`, `SENSITIVE`, `RESTRICTED`, `CONFIDENTIAL`, `SECRET` or `TOP-SECRET`. |
| linz:created                 | string | **REQUIRED**. Creation date and time of the collection in UTC.                                                                                                                                                                                                                                                                                   |
| linz:updated                 | string | **REQUIRED**. Date and time the collection was updated last, in UTC.                                                                                                                                                                                                                                                                             |

### Extensions

This extension includes two other extensions:

- [quality](../quality)
- [version](https://github.com/stac-extensions/version)

## Contributing

All contributions are subject to the
[STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md).
For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md).
