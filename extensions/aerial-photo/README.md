# Aerial Photography Extension Specification

**This is a work in progress and has not been reviewed everything is likely to change**

- **Title**: Aerial Photography
- **Identifier**:
  <https://stac.linz.govt.nz/_STAC_VERSION_/aerial-photo/schema.json>
- **Field Name Prefix**: aerial-photo
- **Scope**: Item, Collection
- **Extension Classification**: Work In Progress (Before proposal)

- Examples:
  - [Collection example](https://stac.linz.govt.nz/_STAC_VERSION_/aerial-photo/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/_STAC_VERSION_/aerial-photo/examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](https://stac.linz.govt.nz/_STAC_VERSION_/aerial-photo/schema.json)

## Item Properties or Asset Fields

| Field Name                   | Type    | Description                                                                                                   |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| aerial-photo:run             | string  | **REQUIRED** A straight line/pass of sequential imagery flown during a specific survey.                       |
| aerial-photo:altitude        | integer | Altitude in feet at which the plane was flying when the photo was taken.                                      |
| aerial-photo:scale           | integer | Denominator of the distance on the ground relative to the distance on the physical film negative for a photo. |
| aerial-photo:sequence_number | integer | **REQUIRED** Sequential order of photos taken during a run.                                                   |
| aerial-photo:anomalies       | string  | Comments about unusual things noticed in the image.                                                           |

## Collection Fields

The above fields can be added to Collection summaries.
