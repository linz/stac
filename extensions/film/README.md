# Film Extension Specification

**This is a work in progress and has not been reviewed everything is likely to change**

- **Title**: Film
- **Identifier**:
  [https://linz.github.io/stac/_STAC_VERSION_/film/schema.json]()
- **Field Name Prefix**: film
- **Scope**: Item
- **Extension Classification**: Work In Progress (Before proposal)

## Item Properties or Asset Fields

| Field Name              | Type    | Description                                                                                     |
| ----------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| film:id                 | string  | **REQUIRED** Identification number assigned by NZAM to each roll of film held in their storage. |
| film:sequence_number    | integer | **REQUIRED** Sequential order of each negative within a roll of film.                           |
| film:physical_condition | string  | Comments field about unusual film condition.                                                    |
| film:physical_size      | string  | Physical size of the negatives on a roll of film.                                               |
