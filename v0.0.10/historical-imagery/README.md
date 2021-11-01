# LINZ Historical Imagery Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Historical Imagery
- **Identifier**: <https://stac.linz.govt.nz/v0.0.10/historical-imagery/schema.json>
- **Field Name Prefix**: historical-imagery
- **Scope**: Item, Collection
- **Extension Maturity Classification**: Work In Progress (Before proposal)

LINZ is currently scanning 550,000 photo negatives from 7,300 aerial surveys
flown between 1936 and 2008.

As of July 2020, more than 493,000 photos have been digitised and made
available, free of charge, under the Creative Commons Attribution 4.0
International licence.

The survey metadata that is being converted to STAC can be viewed and downloaded
from the [LINZ Data Service](https://data.linz.govt.nz/layer/51002).

For more details see
[The Crown Aerial Film Archive historical imagery scanning project](https://www.linz.govt.nz/about-linz/what-were-doing/projects/crown-aerial-film-archive-historical-imagery-scanning-project).

- Examples:
  - [Collection example](examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](./schema.json)

## STAC Collections

### [STAC Collection Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md)

| Field Name | Type   | Description                                                                     | Internal Field Name           |
| ---------- | ------ | ------------------------------------------------------------------------------- | ----------------------------- |
| id         | string | **REQUIRED**. Identifier for the Collection that is unique across the provider. | N/A                           |
| title      | string | **REQUIRED**. A short descriptive one-line title for the Collection.            | survey\|alternate_survey_name |

## STAC Items

### [STAC Item Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0-rc.1/item-spec/item-spec.md)

| Field Name | Type                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                           | Internal Field Name |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| id         | string                                                                                                                                | **REQUIRED**. Provider identifier. The ID should be unique within the Collection that contains the Item.                                                                                                                                                                                                                                                                                                                              | sufi                |
| geometry   | [GeoJSON Geometry Object](https://tools.ietf.org/html/rfc7946#section-3.1) \| [null](https://tools.ietf.org/html/rfc7946#section-3.2) | **REQUIRED.** Defines the full footprint of the asset represented by this item, formatted according to [RFC 7946, section 3.1](https://tools.ietf.org/html/rfc7946#section-3.1). The footprint should be the default GeoJSON geometry, though additional geometries can be included. Coordinates are specified in Longitude/Latitude or Longitude/Latitude/Elevation based on [WGS 84](http://www.opengis.net/def/crs/OGC/1.3/CRS84). | shape               |
| bbox       | \[number]                                                                                                                             | **REQUIRED if `geometry` is not `null`.** Bounding Box of the asset represented by this Item, formatted according to [RFC 7946, section 5](https://tools.ietf.org/html/rfc7946#section-5).                                                                                                                                                                                                                                            | shape               |

### [STAC Item Properties](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object)

| Field Name | Type         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Internal Field Name |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| datetime   | string\|null | **REQUIRED**. The searchable date and time of the assets, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). `null` is allowed, but requires `start_datetime` and `end_datetime` from [common metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#date-and-time-range) to be set. | date                |

#### [Common Metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md)

| Field Name  | Type      | Description                                                             | Internal Field Name           |
| ----------- | --------- | ----------------------------------------------------------------------- | ----------------------------- |
| platform    | string    | **REQUIRED**. Name of the platform to which the instrument is attached. | N/A                           |
| instruments | \[string] | Name of instrument or sensor used (e.g., MODIS, ASTER, OLI, Canon F-1). | camera                        |
| mission     | string    | **REQUIRED**. Name of the mission for which data is collected.          | survey\|alternate_survey_name |

#### [Projection Extension](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md)

| Field Name                                                                                        | Type                                                                                                   | Description                                                                                                                                             | Internal Field Name              |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [proj:epsg](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#projepsg)         | integer\|null                                                                                          | **REQUIRED**. [EPSG code](http://www.epsg-registry.org/) of the data source. This is required by STAC. Set to `null` if there is no suitable EPSG code. | N/A                              |
| [proj:centroid](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#projcentroid) | [Centroid Object](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#centroid-object) | Coordinates representing the centroid of the Item (in lat/long).                                                                                        | photocentre_lat\|photocentre_lon |

#### [Electro-Optical Extension](https://github.com/stac-extensions/eo)

| Field Name                                                                      | Type                                                                                      | Description                                                                      | Internal Field Name               |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- |
| [eo:bands](https://github.com/stac-extensions/eo/blob/v1.0.0/README.md#eobands) | \[[Band Object](https://github.com/stac-extensions/eo/blob/v1.0.0/README.md#band-object)] | The eo:bands array is used to describe the available spectral bands in an Asset. | photo_type or image file metadata |

#### [Aerial Photography Extension](../aerial-photo)

| Field Name                   | Type    | Description                                                                                                   | Internal Field Name |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- | ------------------- |
| aerial-photo:run             | string  | **REQUIRED**. A straight line/pass of sequential imagery flown during a specific survey.                      | run                 |
| aerial-photo:altitude        | integer | Altitude in feet at which the plane was flying when the photo was taken.                                      | altitude            |
| aerial-photo:scale           | integer | Denominator of the distance on the ground relative to the distance on the physical film negative for a photo. | scale               |
| aerial-photo:sequence_number | integer | **REQUIRED**. Sequential order of photos taken during a run.                                                  | photo_no            |
| aerial-photo:anomalies       | string  | Comments about unusual things noticed in the image.                                                           | image_anomalies     |

#### [Camera Extension](../camera)

| Field Name                  | Type    | Description                                                                                                                      | Internal Field Name  |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| camera:sequence_number      | integer | Also referred to as veder; the sequential order of photos taken by an individual camera.                                         | camera_sequence_no   |
| camera:nominal_focal_length | integer | Distance in mm from the camera lens centre to the film in the camera at which the image will have the least possible distortion. | nominal_focal_length |

#### [Film Extension](../film)

| Field Name              | Type    | Description                                                                                      | Internal Field Name     |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------ | ----------------------- |
| film:id                 | string  | **REQUIRED**. Identification number assigned by NZAM to each roll of film held in their storage. | film                    |
| film:negative_sequence  | integer | **REQUIRED**. Sequential order of each negative within a roll of film.                           | film_sequence_no        |
| film:physical_condition | string  | Comments field about unusual film condition.                                                     | physical_film_condition |
| film:physical_size      | string  | Physical size of the negatives on a roll of film.                                                | format                  |

#### [Scanning Extension](../scanning)

| Field Name       | Type    | Description                                                                                                                                                                                                                                                            | Internal Field Name |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| scan:is_original | boolean | Whether the scan is of an original negative (true) or a copy (false).                                                                                                                                                                                                  | source              |
| scan:scanned     | string  | Date and time the corresponding data was scanned. For LINZ data, this will be the start datetime for the calendar year quarter in which the data was scanned. MUST be formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6). | when_scanned        |
