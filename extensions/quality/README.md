# Data Quality Extension Specification

- **Title:** Data Quality
- **Identifier:** <https://github.com/linz/STAC/blob/v0.0.1/extensions/quality/json-schema/schema.json> (TBC)
- **Field Name Prefix:** quality
- **Scope:** Item, Collection
- **Extension [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):** Proposal

The Data Quality STAC extension covers metadata that LINZ requires or recommends that data managers record about their datasets at the dataset level for metadata record management / publishing purposes.

This extension applies to STAC Items or STAC Collections. The fields below are added at the Collection level which maps to what LINZ considers to be a "dataset". Note that datasets are "per survey" for Aerial Imagery, Historical Aerial Photos and Elevation Data.

- Examples (TBC):
  - [Collection example](examples/collection.json): Shows the basic usage of the extension in a STAC Collection
- [JSON Schema](json-schema/schema.json)
- [Changelog](./CHANGELOG.md)

## Collection Fields

| Field Name                               | Type                                       | Description |
| ---------------------------------------- | ------------------------------------------ | ----------- |
| quality:description                         | string                                     | **REQUIRED.** Information or description relating to the quality of the dataset. |
| quality:horizontal_accuracy                    | datetime                                   | **REQUIRED.** The horizontal accuracy of the dataset in metres. |
| quality:horizontal_accuracy_type              | string                                     | **REQUIRED.** The type of accuracy for the horizontal accuracy value. |
| quality:vertical_accuracy                   | string                                     | The vertical accuracy of the dataset in metres.  |
| quality:vertical_accuracy_type              | string                                     | The type of accuracy for the vertical accuracy value. |
