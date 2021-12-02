# Camera Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Camera
- **Identifier**:
  <https://stac.linz.govt.nz/_STAC_VERSION_/camera/schema.json>
- **Field Name Prefix**: camera
- **Scope**: Item, Collection
- **Extension Classification**: Work In Progress (Before proposal)

- Examples:
  - [Collection example](https://stac.linz.govt.nz/_STAC_VERSION_/camera/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/_STAC_VERSION_/camera/examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](https://stac.linz.govt.nz/_STAC_VERSION_/camera/schema.json)

## Item Properties or Asset Fields

| Field Name                  | Type    | Description                                                                                                                      |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| camera:sequence_number      | integer | The sequential order of photos taken by an individual camera                                                                     |
| camera:nominal_focal_length | integer | Distance in mm from the camera lens centre to the film in the camera at which the image will have the least possible distortion. |

## Collection Fields

The above fields can be added to Collection summaries.
