# LINZ Historical Imagery Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Historical Imagery
- **Identifier**: historical-imagery
- **Field Name Prefix**: historical-imagery
- **Scope**: Item
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

## STAC Collections

### [STAC Collection Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md)

| Field Name | Type   | Description                                                                     | Internal Field Name           | Example                      | Comments                                         |
| ---------- | ------ | ------------------------------------------------------------------------------- | ----------------------------- | ---------------------------- | ------------------------------------------------ |
| id         | string | **REQUIRED**. Identifier for the Collection that is unique across the provider. | N/A                           | `01F97K87EF0T6Z0A48S7PFKC3W` | Generated ULID.                                  |
| title      | string | **REQUIRED**. A short descriptive one-line title for the Collection.            | survey\|alternate_survey_name | `123; 4567; CAA1012`         | Need to determine which field to pull this from. |

## STAC Items

### [STAC Item Fields](https://github.com/radiantearth/stac-spec/blob/v1.0.0-rc.1/item-spec/item-spec.md)

| Field Name | Type                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                           | Internal Field Name | Example  | Comments                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- | -------------------------------------------------------------------- |
| id         | string                                                                                                                                | **REQUIRED**. Provider identifier. The ID should be unique within the Collection that contains the Item.                                                                                                                                                                                                                                                                                                                              | sufi                | `493652` | ...                                                                  |
| geometry   | [GeoJSON Geometry Object](https://tools.ietf.org/html/rfc7946#section-3.1) \| [null](https://tools.ietf.org/html/rfc7946#section-3.2) | **REQUIRED.** Defines the full footprint of the asset represented by this item, formatted according to [RFC 7946, section 3.1](https://tools.ietf.org/html/rfc7946#section-3.1). The footprint should be the default GeoJSON geometry, though additional geometries can be included. Coordinates are specified in Longitude/Latitude or Longitude/Latitude/Elevation based on [WGS 84](http://www.opengis.net/def/crs/OGC/1.3/CRS84). | shape               | ...      | Reproject to WGS84.                                                  |
| bbox       | \[number]                                                                                                                             | **REQUIRED if `geometry` is not `null`.** Bounding Box of the asset represented by this Item, formatted according to [RFC 7946, section 5](https://tools.ietf.org/html/rfc7946#section-5).                                                                                                                                                                                                                                            | shape               | ...      | This is the bounding box of the shape field using WGS84 coordinates. |

### [STAC Item Properties](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object)

| Field Name | Type         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Internal Field Name | Example                | Comments        |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ---------------------- | --------------- |
| datetime   | string\|null | **REQUIRED**. The searchable date and time of the assets, in UTC. It is formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). `null` is allowed, but requires `start_datetime` and `end_datetime` from [common metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md#date-and-time-range) to be set. | date                | `1958-01-23T00:00:00Z` | Convert to UTC. |

#### [Common Metadata](https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/common-metadata.md)

| Field Name  | Type      | Description                                                             | Internal Field Name           | Example                     | Comments                                         |
| ----------- | --------- | ----------------------------------------------------------------------- | ----------------------------- | --------------------------- | ------------------------------------------------ |
| platform    | string    | **REQUIRED**. Name of the platform to which the instrument is attached. | N/A                           | `Fixed-wing Aircraft`       | Insert default value.                            |
| instruments | \[string] | Name of instrument or sensor used (e.g., MODIS, ASTER, OLI, Canon F-1). | camera                        | `Wild RC5; Zeiss RMK 60-23` | ...                                              |
| mission     | string    | **REQUIRED**. Name of the mission for which data is collected.          | survey\|alternate_survey_name | `123; 4567; CAA1012`        | Need to determine which field to pull this from. |

#### [Projection Extension](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md)

| Field Name                                                                                        | Type                                                                                                   | Description                                                                                                                                             | Internal Field Name              | Example              | Comments |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------- | -------- |
| [proj:epsg](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#projepsg)         | integer\|null                                                                                          | **REQUIRED**. [EPSG code](http://www.epsg-registry.org/) of the data source. This is required by STAC. Set to `null` if there is no suitable EPSG code. | N/A                              | `null`               | ...      |
| [proj:centroid](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#projcentroid) | [Centroid Object](https://github.com/stac-extensions/projection/blob/v1.0.0/README.md#centroid-object) | Coordinates representing the centroid of the Item (in lat/long).                                                                                        | photocentre_lat\|photocentre_lon | `-37.9128, 178.2355` | ...      |

#### [Electro-Optical Extension](https://github.com/stac-extensions/eo)

| Field Name                                                                      | Type                                                                                      | Description                                                                      | Internal Field Name               | Example                                               | Comments                                                                                                |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [eo:bands](https://github.com/stac-extensions/eo/blob/v1.0.0/README.md#eobands) | \[[Band Object](https://github.com/stac-extensions/eo/blob/v1.0.0/README.md#band-object)] | The eo:bands array is used to describe the available spectral bands in an Asset. | photo_type or image file metadata | `[{"name": "Black and White", "common_name": "pan"}]` | Identify photo_type / image file metadata mismatch? Each Asset should also specify its own band object. |

#### [Aerial Photography Extension](../aerial-photo)

| Field Name                   | Type        | Description                                                                                                                                                        | Internal Field Name | Example                         | Comments                                                               |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| aerial-photo:run             | string      | **REQUIRED**. A straight line/pass of sequential imagery flown during a specific survey.                                                                           | run                 | `1; 2; A; B`                    | ...                                                                    |
| aerial-photo:altitude        | integer     | Altitude in feet at which the plane was flying when the photo was taken.                                                                                           | altitude            | `5000; 16500`                   | Convert to metres?                                                     |
| aerial-photo:scale           | integer     | Denominator of the distance on the ground relative to the distance on the physical film negative for a photo.                                                      | scale               | `44500`                         | ...                                                                    |
| aerial-photo:sequence_number | integer     | **REQUIRED**. Sequential order of photos taken during a run.                                                                                                       | photo_no            | `1; 2; 3; 4`                    | ...                                                                    |
| ~~aerial-photo:version~~     | ~~integer~~ | Assume it has to do with photos that were re-flown due to cloud cover or another anomaly, and thus we may have two variant copies of the same survey/run/photo no. | photo_version       | `1; 2`                          | Decision made not to include this in the STAC schema.                  |
| aerial-photo:anomalies       | string      | Comments about unusual things noticed in the image.                                                                                                                | image_anomalies     | `Cloud shadow; Fogging present` | Often erroneously contains comments about the physical film condition. |

#### [Camera Extension](../camera)

| Field Name                  | Type    | Description                                                                                                                      | Internal Field Name  | Example         | Comments |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------- | -------- |
| camera:sequence_number      | integer | Also referred to as veder; the sequential order of photos taken by an individual camera.                                         | camera_sequence_no   | `33410; 199101` | ...      |
| camera:nominal_focal_length | integer | Distance in mm from the camera lens centre to the film in the camera at which the image will have the least possible distortion. | nominal_focal_length | `210; 114`      | ...      |

#### [Film Extension](../film)

| Field Name              | Type    | Description                                                                                      | Internal Field Name     | Example                                                     | Comments |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------ | ----------------------- | ----------------------------------------------------------- | -------- |
| film:id                 | string  | **REQUIRED**. Identification number assigned by NZAM to each roll of film held in their storage. | film                    | `996; 2510C; CAA22`                                         | ...      |
| film:negative_sequence  | integer | **REQUIRED**. Sequential order of each negative within a roll of film.                           | film_sequence_no        | `234, 4567`                                                 | ...      |
| film:physical_condition | string  | Comments field about unusual film condition.                                                     | physical_film_condition | `Film scratched; Metadata manually populated; Not Film 222` | ...      |
| film:physical_size      | string  | Physical size of the negatives on a roll of film.                                                | format                  | `23 cm x 23 cm; 18 cm x 23 cm`                              | ...      |

#### [Scanning Extension](../scanning)

| Field Name       | Type    | Description                                                                                                                                                                                                                                                            | Internal Field Name | Example                    | Comments            |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------- | ------------------- |
| scan:is_original | boolean | Whether the scan is of an original negative (true) or a copy (false).                                                                                                                                                                                                  | source              | `ORIGINAL; COPY`           | Convert to boolean. |
| scan:scanned     | string  | Date and time the corresponding data was scanned. For LINZ data, this will be the start datetime for the calendar year quarter in which the data was scanned. MUST be formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6). | when_scanned        | `2018-10-01T00:00:00.000Z` | ...                 |
