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

| Field Name       | Type    | Description                                                                                                                                                                                                                                                     |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scan:is_original | boolean | Whether the scan is of an original negative (true) or a copy (false).                                                                                                                                                                                           |
| scan:scanned     | string  | Government year quarter start date which the photo was scanned/delivered to us, in UTC. Formatted according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6) and [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html). |
