# LINZ Top Level Extension Specification

- **Title:** LINZ Top Level Extension
- **Identifier:**
  <https://stac.linz.govt.nz/v0.1.3/linz/schema.json>
- **Field Name Prefix:** linz
- **Scope:** Item, Collection
- **Extension
  [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):**
  Proposal
- **Owner**: @billgeo @imincik @l0b0 @MitchellPaff

This is LINZ top level
[SpatioTemporal Asset Catalog](https://github.com/radiantearth/stac-spec) (STAC)
extension which adds constraints to default STAC schema fields.

- Examples:
  - [Collection example](https://stac.linz.govt.nz/v0.1.3/linz/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/v0.1.3/linz/examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](https://stac.linz.govt.nz/v0.1.3/linz/schema.json)
- [Changelog](https://stac.linz.govt.nz/v0.1.3/linz/CHANGELOG.md)

## Item Fields

### Item Properties Object Fields

| Field Name          | Type                | Description                                                                                                                                     |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| processing:software | Map<string, string> | Recommended. The software and versions which were used to generate the dataset. See [reference](https://github.com/stac-extensions/processing). |

## Collection Fields

| Field Name                   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title                        | string              | **REQUIRED**. Collection title.                                                                                                                                                                                                                                                                                                                                                                   |
| linz:lifecycle               | string              | **REQUIRED**. Lifecycle Status of Collection. Must be one of `under development`, `preview`, `ongoing`, `completed`, `deprecated`.                                                                                                                                                                                                                                                                |
| providers                    | Provider Object     | **REQUIRED**. The object provides information about a provider. A provider is any of the organizations that captures or processes the content of the assets and therefore influences the data offered by the STAC implementation. See [Provider Object](#provider-object).                                                                                                                        |
| linz:security_classification | string              | **REQUIRED**. New Zealand Government [Security Classification](https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/). Must be one of `unclassified`, `in-confidence`, `sensitive`, `restricted`, `confidential`, `secret` or `top-secret`.                                                  |
| linz:geospatial_category     | string              | Geospatial category of the data in the collection. Must be one of `ancillary-aerial-photos`, `ancillary-near-infrared-aerial-photos`, `dem`, `dem-hillshade`, `dem-hillshade-igor`, `dsm`, `dsm-hillshade`, `dsm-hillshade-igor`, `near-infrared-aerial-photos`, `near-infrared-satellite-imagery`, `rural-aerial-photos`, `satellite-imagery`, `scanned-aerial-photos` or `urban-aerial-photos`. |
| linz:event_name              | string              | Description of the event associated with the collection.                                                                                                                                                                                                                                                                                                                                          |
| linz:geographic_description  | string              | Description of the area covered by the collection.                                                                                                                                                                                                                                                                                                                                                |
| linz:historic_survey_number  | string              | Historic survey number, e.g. `SNC8844`.                                                                                                                                                                                                                                                                                                                                                           |
| linz:region                  | string              | Must be one of `antarctica`, `auckland`, `bay-of-plenty`, `canterbury`, `chatham-islands`, `gisborne`, `global`, `hawkes-bay`, `manawatu-whanganui`, `marlborough`, `nelson`, `new-zealand`, `northland`, `otago`, `pacific-islands`, `southland`, `taranaki`, `tasman`, `waikato`, `wellington`, or `west-coast`.                                                                                |
| linz:slug                    | string              | The `<name>_<date>_<GSD>` part of the Open Data Registry path, e.g. `new-zealand_2015_1m`.                                                                                                                                                                                                                                                                                                        |
| processing:software          | Map<string, string> | Recommended. The software and versions which were used to generate the dataset. See [reference](https://github.com/stac-extensions/processing).                                                                                                                                                                                                                                                   |

### Provider Object Fields

This expands on the [provider object in the STAC spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#provider-object). Only differences from that definition are mentioned here.

| Field Name | Type      | Description                                                                                            |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------ |
| roles      | \[string] | **There needs to be at least one provider with the `licensor` role and one with the `producer` role.** |

## Asset Fields

These fields apply to assets within both items and collections.

| Field Name    | Type   | Description                                                                                             |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| created       | string | **REQUIRED**. Creation date and time of the asset, in UTC.                                              |
| updated       | string | **REQUIRED**. Date and time the asset was last updated, in UTC.                                         |
| file:checksum | string | **REQUIRED**. See [reference](https://github.com/stac-extensions/file/blob/v2.0.0/README.md#checksums). |

## Extensions

This extension includes these other extensions:

- [file](https://github.com/stac-extensions/file)

It is also recommended to use:

- [processing](https://github.com/stac-extensions/processing) (`processing:software`)

## Contributing

All contributions are subject to the
[STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md).
For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md).
