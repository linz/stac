# Film Extension Specification

**This is a work in progress and has not been reviewed everything is likely to change**

- **Title**: Film
- **Identifier**:
  <https://stac.linz.govt.nz/_STAC_VERSION_/film/schema.json>
- **Field Name Prefix**: film
- **Scope**: Item, Collection
- **Extension Classification**: Work In Progress (Before proposal)

- Examples:
  - [Collection example](https://stac.linz.govt.nz/_STAC_VERSION_/film/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/_STAC_VERSION_/film/examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](https://stac.linz.govt.nz/_STAC_VERSION_/film/schema.json)

## Item Properties or Asset Fields

| Field Name              | Type    | Description                                                           |
| ----------------------- | ------- | --------------------------------------------------------------------- |
| film:id                 | string  | **REQUIRED** Identifier assigned to each roll of film.                |
| film:negative_sequence  | integer | **REQUIRED** Sequential order of each negative within a roll of film. |
| film:physical_condition | string  | Comments field about unusual film condition.                          |
| film:physical_size      | string  | Physical size of the negatives on a roll of film.                     |

## Collection Fields

The above fields can be added to Collection summaries.
