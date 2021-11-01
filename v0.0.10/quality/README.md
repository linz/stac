# Quality Extension Specification

- **Title**: Quality
- **Identifier**:
  <https://stac.linz.govt.nz/v0.0.10/quality/schema.json>
- **Field Name Prefix**: quality
- **Scope**: Collection
- **Extension
  [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):**
  Proposal
- **Owner**: @billgeo @imincik @l0b0 @MitchellPaff

Quality metadata is considered to be data that indicates the geospatial quality and accuracy of the collection. Overall, it helps to increase the user's confidence in the data and helps them determine if the data is fit for their purpose.

This extension applies to STAC Collections, as quality and accuracy is most often bound to the Collection level and therefore shared across all items. It is recommended adding these fields to the corresponding the STAC Collection for geospatial datasets.

## Collection Fields

| Field Name                       | Type   | Description                                                                                                  |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| quality:description              | string | Information or description relating to the quality of the dataset.                                           |
| quality:horizontal_accuracy      | number | The horizontal accuracy of the dataset. Must be in units of metres.                                          |
| quality:horizontal_accuracy_type | string | The type of accuracy for the horizontal accuracy value. Options are "nominal" and "95% confidence interval". |
| quality:vertical_accuracy        | number | The vertical accuracy of the dataset. Must be in units of metres.                                            |
| quality:vertical_accuracy        | number | The vertical accuracy of the dataset. Must be in units of metres.                                            |
| quality:vertical_accuracy_type   | string | The type of accuracy for the vertical accuracy value. Options are "nominal" and "95% confidence interval".   |
