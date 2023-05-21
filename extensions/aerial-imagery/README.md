# LINZ Aerial Imagery Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Aerial Imagery
- **Identifier**: <https://stac.linz.govt.nz/_STAC_VERSION_/aerial-imagery/schema.json>
- **Field Name Prefix**: aerial-imagery
- **Scope**: Item, Collection
- **Extension Maturity Classification**: Work In Progress (Before proposal)

Toitū Te Whenua makes New Zealand’s publicly owned aerial imagery freely available to use under an open licence. You can access this through the [LINZ Data Service](https://data.linz.govt.nz/data/category/aerial-photos/?s=n), [LINZ Basemaps](https://basemaps.linz.govt.nz/#@-41.8899962,174.0492437,z5) or an Amazon Web Services (AWS) S3 bucket.

STAC metadata is stored in `s3://linz-imagery`, a public requester-pays bucket in the `ap-southeast-2` region, alongside the aerial imagery surveys. The STAC Catalog and Collections are maintained using a [public GitHub repository](https://github.com/linz/imagery).

The aerial imagery survey metadata that is being converted to STAC is also held in the NZ Imagery Survey Index layer on the [LINZ Data Service](https://data.linz.govt.nz/layer/95677).

For more details see
[our website](https://www.linz.govt.nz/products-services/data/types-linz-data/aerial-imagery).

- Examples:
  - [Collection example](https://stac.linz.govt.nz/_STAC_VERSION_/aerial-imagery/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/_STAC_VERSION_/aerial-imagery/examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](https://stac.linz.govt.nz/_STAC_VERSION_/aerial-imagery/schema.json)

## STAC Collections

### [STAC Collection Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md)

| Field Name | Type   | Description                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------- |
| title      | string | **REQUIRED**. A short descriptive one-line title for the Collection.            |
| providers  | [Provider Object](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#provider-object) | **REQUIRED**. A list of providers. At least one Provider with a role of each of `licensor`, `producer`, `processer` and `host` must exist. |

## STAC Items

### [STAC Item Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0-rc.1/item-spec/item-spec.md)

| Field Name | Type                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | string                                                                                                                                | **REQUIRED**. Provider identifier. The ID should be unique within the Collection that contains the Item.                                                                                                                                                                                                                                                                                                                              |
| geometry   | [GeoJSON Geometry Object](https://tools.ietf.org/html/rfc7946#section-3.1) \| [null](https://tools.ietf.org/html/rfc7946#section-3.2) | **REQUIRED.** Defines the full footprint of the asset represented by this item, formatted according to [RFC 7946, section 3.1](https://tools.ietf.org/html/rfc7946#section-3.1). The footprint should be the default GeoJSON geometry, though additional geometries can be included. Coordinates are specified in Longitude/Latitude or Longitude/Latitude/Elevation based on [WGS 84](http://www.opengis.net/def/crs/OGC/1.3/CRS84). |
| bbox       | \[number]                                                                                                                             | **REQUIRED** Bounding Box of the asset represented by this Item, formatted according to [RFC 7946, section 5](https://tools.ietf.org/html/rfc7946#section-5).                                                                                                                                                                                                                                            |

### [STAC Item Properties](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object)

| Field Name | Type         | Description                                                                                                                                                                                                                                                       |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| datetime   | null         | **REQUIRED**. Use `null` as `start_datetime` and `end_datetime` from [common metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#date-and-time-range) are to be used instead. |

#### [Common Metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md)

| Field Name     | Type      | Description                                                                                          |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| start_datetime | string    | **REQUIRED**. The first or start date and time for the Item, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). |
| end_datetime | string    | **REQUIRED**. The first or start date and time for the Item, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). |

#### [File Info Extension](https://github.com/stac-extensions/file/blob/v1.0.0/README.md)

| Field Name                                                                                        | Type                                                                                                   | Description                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [file:checksum](https://github.com/stac-extensions/file/blob/v1.0.0/README.md#checksums)  | string        | **REQUIRED**. Provides a way to specify file [checksums](#checksums) (e.g. BLAKE2, MD5, SHA1, SHA2, SHA3). The hashes are self-identifying hashes as described in the [Multihash specification](https://github.com/multiformats/multihash) and must be encoded as hexadecimal (base 16) string with lowercase letters. |
