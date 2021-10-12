# Film Extension Specification

**This is a work in progress and has not been reviewed everything is likely to change**

- **Title**: Film
- **Identifier**:
  [https://linz.github.io/stac/v0.0.8/film/schema.json]()
- **Field Name Prefix**: film
- **Scope**: Item
- **Extension Classification**: Work In Progress (Before proposal)

## Item Properties or Asset Fields

| Field Name              | Type    | Description                                                           |
| ----------------------- | ------- | --------------------------------------------------------------------- |
| film:id                 | string  | **REQUIRED** Identifier assigned to each roll of film.                |
| film:negative_sequence  | integer | **REQUIRED** Sequential order of each negative within a roll of film. |
| film:physical_condition | string  | Comments field about unusual film condition.                          |
| film:physical_size      | string  | Physical size of the negatives on a roll of film.                     |
