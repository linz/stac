# LINZ Top Level Extension Specification

- **Title:** LINZ Top Level Extension
- **Identifier:**
  <https://stac.linz.govt.nz/_STAC_VERSION_/linz/schema.json>
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
  - [Collection example](https://stac.linz.govt.nz/_STAC_VERSION_/linz/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/_STAC_VERSION_/linz/examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](https://stac.linz.govt.nz/_STAC_VERSION_/linz/schema.json)
- [Changelog](https://stac.linz.govt.nz/_STAC_VERSION_/linz/CHANGELOG.md)

## Item Fields

### Item Properties Object Fields

| Field Name          | Type                | Description                                                                                                                                     |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| processing:software | Map<string, string> | Recommended. The software and versions which were used to generate the dataset. See [reference](https://github.com/stac-extensions/processing). |

### Geospatial Types

See [ISO/IEC 13249-3:2016(en)](https://www.iso.org/obp/ui/#!iso:std:60343:en) for further information on geometric data types

| Name                           | Additional description                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| black and white image          | Non-georeferenced black and white image                                                                     |
| black and white infrared image | Non-georeferenced black and white infrared image                                                            |
| circular string                | A continuous collection of arcs (lines with curved interpolation between points)                            |
| color image                    | Non-georeferenced color image                                                                               |
| color infrared image           | Non-georeferenced color infrared image                                                                      |
| compound curve                 | A continuous collection of circular strings and/or linestrings                                              |
| curve polygon                  | A polygon that contains circular strings or compound curves                                                 |
| geometry                       | When mixed geometry types are used in the same dataset                                                      |
| geometry collection            | A collection of mixed geometric types                                                                       |
| grayscale                      | Single band raster, byte datatype, grayscale interpretation, with optional 2nd band for Alpha               |
| grid                           | Single band raster, non-byte datatype, grayscale interpretation                                             |
| hyperspectral                  | 10+ band raster                                                                                             |
| multicurve                     | A collection of curves (a linestring with non-linear interpolation between points)                          |
| multilinestring                | A collection of linestrings                                                                                 |
| multipoint                     | A collection of points                                                                                      |
| multipolygon                   | A collection of polygons                                                                                    |
| multispectral                  | 4 or more band raster, including RGBI, but not including RGBA                                               |
| multisurface                   | A collection of surfaces (non-planar polygons)                                                              |
| linestring                     | A 1-dimensional geometric object stored as a sequence of points                                             |
| point                          | A 0-dimensional geometric object that represents a single location                                          |
| point cloud                    | A set of points in 3D space, generally produced by LiDAR or photogrammetry                                  |
| polygon                        | A 2-dimensional planar geometric object with an exterior boundary and 0 or more interior boundaries (holes) |
| polyhedral surface             | A contiguous collection of polygons that share common boundary segments                                     |
| rgb                            | RGB color raster, can also include RGBA where 4th band is defined as Alpha                                  |
| tin                            | A contiguous collection of triangles that share common boundary segments                                    |
| triangle                       | A 2-dimensional geometric object stored as three points                                                     |

## Collection Fields

| Field Name                   | Type                             | Description                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title                        | string                           | **REQUIRED**. Collection title.                                                                                                                                                                                                                                                                                                                  |
| linz:asset_summaries         | Map<string, Map<string, string>> | **REQUIRED**. See [Custom Collection Summaries Object Fields](#custom-collection-summaries-object-fields).                                                                                                                                                                                                                                       |
| linz:geospatial_type         | string                           | **REQUIRED**. A general description of the type of content that can be found in the dataset. See the [list of accepted geospatial types](#geospatial-types).                                                                                                                                                                                     |
| linz:history                 | string                           | **REQUIRED**. A descriptive statement about the lineage/history of a dataset                                                                                                                                                                                                                                                                     |
| linz:lifecycle               | string                           | **REQUIRED**. Lifecycle Status of Collection. Must be one of `under development`, `preview`, `ongoing`, `completed`, `deprecated`.                                                                                                                                                                                                               |
| linz:providers               | LINZ Provider Object             | **REQUIRED**. The object provides information about a provider with additional roles defined by Toitū Te Whenua LINZ. A provider is any of the organizations that captures or processes the content of the assets and therefore influences the data offered by the STAC implementation. See [LINZ Provider Object](#linz-provider-object).       |
| providers                    | Provider Object                  | **REQUIRED**. The object provides information about a provider. A provider is any of the organizations that captures or processes the content of the assets and therefore influences the data offered by the STAC implementation. See [Provider Object](#provider-object).                                                                       |
| linz:security_classification | string                           | **REQUIRED**. New Zealand Government [Security Classification](https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/). Must be one of `unclassified`, `in-confidence`, `sensitive`, `restricted`, `confidential`, `secret` or `top-secret`. |
| linz:update_frequency        | string                           | Recommended. Indicates how frequently an updated dataset may be distributed to the publication platform. Must follow the format for durations as defined in [RFC3339](https://datatracker.ietf.org/doc/html/rfc3339#appendix-A). For example, `P3D` expresses a duration of 3 days.                                                              |
| processing:software          | Map<string, string>              | Recommended. The software and versions which were used to generate the dataset. See [reference](https://github.com/stac-extensions/processing).                                                                                                                                                                                                  |

### Custom Collection Summaries Object Fields

| Field Name      | Type      | Description                                                          |
| --------------- | --------- | -------------------------------------------------------------------- |
| created/minimum | date-time | **REQUIRED**. Earliest [asset created value](#asset-fields), in UTC. |
| created/maximum | date-time | **REQUIRED**. Latest [asset created value](#asset-fields), in UTC.   |
| updated/minimum | date-time | **REQUIRED**. Earliest [asset updated value](#asset-fields), in UTC. |
| updated/maximum | date-time | **REQUIRED**. Latest [asset updated value](#asset-fields), in UTC.   |

### LINZ Provider Object Fields

This expands on the [provider object in the STAC spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#provider-object). Only differences from that definition are mentioned here.

| Field Name | Type      | Description                                                                                                                                                                                       |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | string    | For the `manager` role this should be either the Toitū Te Whenua LINZ role name of a person who manages this dataset (to preserve their privacy) or the name of a team that manages this dataset. |
| roles      | \[string] | **There needs to be at least one provider with the `custodian` role and one with the `manager` role.**                                                                                            |
| url        | string    | The `url` should be an internal URL that links to more information about that person or team.                                                                                                     |

### Provider Object Fields

This expands on the [provider object in the STAC spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#provider-object). Only differences from that definition are mentioned here.

| Field Name | Type      | Description                                                                                            |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------ |
| roles      | \[string] | **There needs to be at least one provider with the `licensor` role and one with the `producer` role.** |

## Asset Fields

These fields apply to assets within both items and collections.

| Field Name    | Type   | Description                                                                                                                                                                                        |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| created       | string | **REQUIRED**. Creation date and time of the asset, in UTC.                                                                                                                                         |
| updated       | string | **REQUIRED**. Date and time the asset was last updated, in UTC.                                                                                                                                    |
| file:checksum | string | **REQUIRED**. See [reference](https://github.com/stac-extensions/file/blob/v2.0.0/README.md#checksums).                                                                                            |
| linz:language | string | Required for assets which include text when the collection is shared externally. [RFC 5646 language tag](https://datatracker.ietf.org/doc/html/rfc5646), for example `en-NZ` (New Zealand English) |

## Extensions

This extension includes these other extensions:

- [processing](https://github.com/stac-extensions/processing)
- [projection](https://github.com/stac-extensions/projection)
- [quality](https://stac.linz.govt.nz/_STAC_VERSION_/quality)
- [version](https://github.com/stac-extensions/version)

## Contributing

All contributions are subject to the
[STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md).
For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md).
