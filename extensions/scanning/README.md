# Scanning Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Scanning
- **Identifier**:
  <https://stac.linz.govt.nz/_STAC_VERSION_/scanning/schema.json>
- **Field Name Prefix**: scan
- **Scope**: Item, Collection
- **Extension Classification**: Work In Progress (Before proposal)

- Examples:
  - [Collection example](https://stac.linz.govt.nz/_STAC_VERSION_/scanning/examples/collection.json): Shows the basic usage of the
    extension in a STAC Collection
  - [Item example](https://stac.linz.govt.nz/_STAC_VERSION_/scanning/examples/item.json): Shows the basic usage of the extension
    in a STAC Item
- [JSON Schema](https://stac.linz.govt.nz/_STAC_VERSION_/scanning/schema.json)

## Item Properties or Asset Fields

| Field Name       | Type    | Description                                                                                                                                                                                                                                                            |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scan:is_original | boolean | Whether the scan is of an original negative (true) or a copy (false).                                                                                                                                                                                                  |
| scan:scanned     | string  | Date and time the corresponding data was scanned. For LINZ data, this will be the start datetime for the calendar year quarter in which the data was scanned. MUST be formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6). |

## Collection Fields

The above fields can be added to Collection summaries.
