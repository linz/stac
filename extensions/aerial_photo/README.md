# Aerial Photography Extension Specification

**This is a work in progress and has not been reviewed everything is likely to change**

- **Title**: aerial_photo
- **Identifier**:
  [https://linz.github.io/stac/_STAC_VERSION_/film/aerial_photo.json]()
- **Field Name Prefix**: aerial_photo
- **Scope**: Item
- **Extension Classification**: Work In Progress (Before proposal)

## Item Properties or Asset Fields

| Field Name                   | Type    | Description                                                                                                   |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| aerial_photo:run             | string  | **REQUIRED** A straight line/pass of sequential imagery flown during a specific survey.                       |
| aerial_photo:altitude        | integer | Altitude in feet at which the plane was flying when the photo was taken.                                      |
| aerial_photo:scale           | integer | Denominator of the distance on the ground relative to the distance on the physical film negative for a photo. |
| aerial_photo:sequence_number | integer | **REQUIRED** Sequential order of photos taken during a run.                                                   |
| aerial_photo:anomalies       | string  | Comments about unusual things noticed in the image.                                                           |
