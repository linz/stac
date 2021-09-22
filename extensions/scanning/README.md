# Scanning Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Scanning
- **Identifier**:
  [https://linz.github.io/stac/_STAC_VERSION_/scanning/schema.json]()
- **Field Name Prefix**: scan
- **Scope**: Item
- **Extension Classification**: Work In Progress (Before proposal)

## Item Properties or Asset Fields

| Field Name       | Type    | Description                                                           |
| ---------------- | ------- | --------------------------------------------------------------------- |
| scan:is_original | boolean | Whether the scan is of an original negative (true) or a copy (false). |
| scan:datetime    | string  | Year and quarter during which the photo was scanned/delivered to us.  |
