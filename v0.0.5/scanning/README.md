# Scanning Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Scanning
- **Identifier**:
  [https://linz.github.io/stac/v0.0.5/scanning/schema.json]()
- **Field Name Prefix**: scan
- **Scope**: Item
- **Extension Classification**: Work In Progress (Before proposal)

## Item Properties or Asset Fields

| Field Name       | Type    | Description                                                                                                                                                                                                                                                            |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scan:is_original | boolean | Whether the scan is of an original negative (true) or a copy (false).                                                                                                                                                                                                  |
| scan:scanned     | string  | Date and time the corresponding data was scanned. For LINZ data, this will be the start datetime for the calendar year quarter in which the data was scanned. MUST be formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6). |
