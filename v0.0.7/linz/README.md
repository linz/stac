# LINZ Top Level Extension Specification

- **Title:** LINZ Top Level Extension
- **Identifier:**
  <https://linz.github.io/stac/v0.0.7/linz/schema.json>
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

| Field Name                   | Type                                  | Description                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title                        | string                                | **REQUIRED**. Collection title.                                                                                                                                                                                                                                                                                                                  |
| linz:created                 | string                                | **REQUIRED**. Creation date and time of the collection in UTC.                                                                                                                                                                                                                                                                                   |
| linz:lifecycle               | string                                | **REQUIRED**. Lifecycle Status of Collection. Must be one of `Under Development`, `Preview`, `Ongoing`, `Completed`, `Deprecated`.                                                                                                                                                                                                               |
| linz:providers               | [Providers Object](#providers-object) | **REQUIRED**. A list of providers, which may include all organizations capturing or processing the data or the hosting provider. Providers should be listed in chronological order with the most recent provider being the last element of the list.                                                                                             |
| linz:security_classification | string                                | **REQUIRED**. New Zealand Government [Security Classification](https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/). Must be one of `Unclassified`, `IN-CONFIDENCE`, `SENSITIVE`, `RESTRICTED`, `CONFIDENTIAL`, `SECRET` or `TOP-SECRET`. |
| linz:updated                 | string                                | **REQUIRED**. Date and time the collection was updated last, in UTC.                                                                                                                                                                                                                                                                             |

### Providers Object

This is the introduction for the purpose and the content of the XYZ Object...

| Field Name  | Type      | Description                                                                                                                                                                                                                                  |
| ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | string    | **REQUIRED**. The name of the organization or the individual.                                                                                                                                                                                |
| description | string    | Multi-line description to add further provider information such as processing details for processors and producers, hosting details for hosts or basic contact information. CommonMark 0.29 syntax MAY be used for rich text representation. |
| roles       | \[string] | Roles of the provider. Either `manager` or `custodian`                                                                                                                                                                                       |
| url         | string    | Homepage on which the provider describes the dataset and publishes contact information.                                                                                                                                                      |

### Extensions

This extension includes these other extensions:

- [projection](https://github.com/stac-extensions/projection)
- [quality](../quality)
- [version](https://github.com/stac-extensions/version)

## Contributing

All contributions are subject to the
[STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md).
For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md).
