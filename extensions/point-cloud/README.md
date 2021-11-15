# LINZ Point Cloud Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Point Cloud
- **Identifier**: <https://stac.linz.govt.nz/_STAC_VERSION_/point-cloud/schema.json>
- **Field Name Prefix**: point-cloud
- **Scope**: Item, Collection
- **Extension Maturity Classification**: Work In Progress (Before proposal)

The LINZ National Elevation Programme provides LiDAR based elevation data for much of New Zealand.

- Examples:
  - [Collection example](examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](./schema.json)

## STAC Collections

### [STAC Collection Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md)

| Field Name | Type   | Description                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------- |
| id         | string | **REQUIRED**. Identifier for the Collection that is unique across the provider. |
| title      | string | **REQUIRED**. A short descriptive one-line title for the Collection.            |

## STAC Items

### [STAC Item Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0-rc.1/item-spec/item-spec.md)

| Field Name | Type                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | string                                                                                                                                | **REQUIRED**. Provider identifier. The ID should be unique within the Collection that contains the Item.                                                                                                                                                                                                                                                                                                                              |
| geometry   | [GeoJSON Geometry Object](https://tools.ietf.org/html/rfc7946#section-3.1) \| [null](https://tools.ietf.org/html/rfc7946#section-3.2) | **REQUIRED.** Defines the full footprint of the asset represented by this item, formatted according to [RFC 7946, section 3.1](https://tools.ietf.org/html/rfc7946#section-3.1). The footprint should be the default GeoJSON geometry, though additional geometries can be included. Coordinates are specified in Longitude/Latitude or Longitude/Latitude/Elevation based on [WGS 84](http://www.opengis.net/def/crs/OGC/1.3/CRS84). |
| bbox       | \[number]                                                                                                                             | **REQUIRED if `geometry` is not `null`.** Bounding Box of the asset represented by this Item, formatted according to [RFC 7946, section 5](https://tools.ietf.org/html/rfc7946#section-5).                                                                                                                                                                                                                                            |

### [STAC Item Properties](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object)

| Field Name | Type         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| datetime   | string\|null | **REQUIRED**. The searchable date and time of the assets, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). `null` is allowed, but requires `start_datetime` and `end_datetime` from [common metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#date-and-time-range) to be set. |

#### [Common Metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md)

| Field Name  | Type      | Description                                                             |
| ----------- | --------- | ----------------------------------------------------------------------- |
| platform    | string    | **REQUIRED**. Name of the platform to which the instrument is attached. |
| instruments | \[string] | Name of instrument or sensor used (e.g., MODIS, ASTER, OLI, Canon F-1). |
| mission     | string    | **REQUIRED**. Name of the mission for which data is collected.          |

#### [Projection Extension](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md)

| Field Name                                                                                | Type          | Description                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [proj:epsg](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#projepsg) | integer\|null | **REQUIRED**. [EPSG code](http://www.epsg-registry.org/) of the data source. This is required by the [STAC Projection Extension](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#item-properties-or-asset-fields). Set to `null` if there is no suitable EPSG code. |

#### [Point Cloud Extension](https://github.com/stac-extensions/pointcloud/blob/v1.0.0/README.md)

| Field Name    | Type                                                                                                 | Description                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| pc:count      | integer                                                                                              | **REQUIRED.** The number of points in the Item.                                                                                         |
| pc:type       | string                                                                                               | **REQUIRED.** Phenomenology type for the point cloud. Possible valid values might include `lidar`, `eopc`, `radar`, `sonar`, or `other` |
| pc:encoding   | string                                                                                               | **REQUIRED.** Content encoding or format of the data.                                                                                   |
| pc:schemas    | [[Schema Object](https://github.com/stac-extensions/pointcloud/blob/v1.0.0/README.md#schema-object)] | **REQUIRED.** A sequential array of Items that define the dimensions and their types.                                                   |
| pc:density    | number                                                                                               | Number of points per square unit area.                                                                                                  |
| pc:statistics | [[Stats Object](https://github.com/stac-extensions/pointcloud/blob/v1.0.0/README.md#stats-object)]   | A sequential array of Items mapping to `pc:schemas` defines per-channel statistics.                                                     |

#### Notes

The values required for the `pc` extension fields should be accessible from running `pdal info --all`.

We could consider adding classification counts via `pdal info —filters.stats.dimensions=Classification —filters.stats.count=Classification`.

We could consider adding the boundary from `filters.hexbin` at the Collection level.
