# LINZ Imagery Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: LINZ Imagery
- **Identifier**: <https://stac.linz.govt.nz/_STAC_VERSION_/linz-imagery/schema.json>
- **Field Name Prefix**: none
- **Scope**: Item, Collection
- **Extension Maturity Classification**: Work In Progress (Before proposal)

Toitū Te Whenua makes New Zealand’s publicly owned aerial imagery freely available to use under an open licence. You can access this through the [LINZ Data Service](https://data.linz.govt.nz/data/category/aerial-photos/?s=n), [LINZ Basemaps](https://basemaps.linz.govt.nz/#@-41.8899962,174.0492437,z5) or an Amazon Web Services (AWS) S3 bucket.

STAC metadata is stored in `s3://nz-imagery`, a public bucket in the `ap-southeast-2` region, alongside the aerial imagery surveys. The STAC Catalog and Collections are maintained using a [public GitHub repository](https://github.com/linz/imagery).

The aerial imagery survey metadata that is being converted to STAC is also held in the NZ Imagery Survey Index layer on the [LINZ Data Service](https://data.linz.govt.nz/layer/95677).

For more details see
[our website](https://www.linz.govt.nz/products-services/data/types-linz-data/aerial-imagery).

- Examples:
  - [Collection example](https://stac.linz.govt.nz/_STAC_VERSION_/linz-imagery/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/_STAC_VERSION_/linz-imagery/examples/item.json): Shows the basic usage of the extension
    in a STAC Item

## STAC Collections

### [STAC Collection Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md)

| Field Name | Type                                                                                                                        | Description                                                                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title      | string                                                                                                                      | **REQUIRED**. A short descriptive one-line title for the Collection.                                                                                                        |
| providers  | [Provider Object](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#provider-object) | **REQUIRED**. A list of providers. At least one Provider with a role of each of `licensor`, `producer`, `processor` and `host` must exist.                                  |
| created    | string                                                                                                                      | **REQUIRED**. Creation date and time of the Collection, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6).      |
| updated    | string                                                                                                                      | **REQUIRED**. Date and time the Collection was last updated, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6). |
| gsd        | number                                                                                                                      | **REQUIRED**. Ground sample distance in metres. Must match the GSD at the end of `linz:slug`.                                                                               |

### [LINZ Extension Fields](../linz/README.md)

| Field Name                   | Type   | Description                                                                                                                                                                                                                                                                      |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| linz:lifecycle               | string | **REQUIRED**. Lifecycle Status of Collection. Must be `completed` or `ongoing`.                                                                                                                                                                                                  |
| linz:security_classification | string | **REQUIRED**. New Zealand Government [Security Classification](https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/). Must be `unclassified`.                              |
| linz:geospatial_category     | string | **REQUIRED**. Geospatial category of the data in the collection. Must be one of `ancillary-aerial-photos`, `ancillary-near-infrared-aerial-photos`, `near-infrared-aerial-photos`, `rural-aerial-photos`, `satellite-imagery`, `scanned-aerial-photos` or `urban-aerial-photos`. |
| linz:event_name              | string | Description of the event associated with the collection.                                                                                                                                                                                                                         |
| linz:geographic_description  | string | Description of the area covered by the collection.                                                                                                                                                                                                                               |
| linz:historic_survey_number  | string | **REQUIRED** when `linz:geospatial_category` is `scanned-aerial-photos`, and not used for other categories. Historic survey number, e.g. `SNC8844`.                                                                                                                              |
| linz:region                  | string | **REQUIRED**. Must match the region in the Collection's path, `stac/{region}/{slug}/{product}/{crs}/collection.json`.                                                                                                                                                            |
| linz:slug                    | string | **REQUIRED**. The `<name>_<date>_<GSD>` part of the Open Data Registry path, e.g. `bay-of-plenty_2021-2022_0.2m`.                                                                                                                                                                |

## STAC Items

### [STAC Item Properties](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object)

| Field Name | Type | Description                                                                                                                                                                                         |
| ---------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| datetime   | null | Always `null`. `start_datetime` and `end_datetime` from [common metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#date-and-time-range) are used instead. |

#### [Common Metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md)

| Field Name     | Type   | Description                                                                                                                                                                                                                                        |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| start_datetime | string | **REQUIRED**. The first or start date and time for the Item, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). |
| end_datetime   | string | **REQUIRED**. The last or end date and time for the Item, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html).    |
| created        | string | **REQUIRED**. Creation date and time of the Item, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6).                                                                                   |
| updated        | string | **REQUIRED**. Date and time the Item was last updated, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6).                                                                              |

#### [File Info Extension](https://github.com/stac-extensions/file/blob/v2.0.0/README.md)

| Field Name                                                                               | Type   | Description                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [file:checksum](https://github.com/stac-extensions/file/blob/v2.0.0/README.md#checksums) | string | **REQUIRED**. Provides a way to specify file [checksums](https://github.com/stac-extensions/file/blob/v2.0.0/README.md#checksums) (e.g. BLAKE2, MD5, SHA1, SHA2, SHA3). The hashes are self-identifying hashes as described in the [Multihash specification](https://github.com/multiformats/multihash) and must be encoded as hexadecimal (base 16) string with lowercase letters. |
