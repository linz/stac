# Quality Extension Specification

- **Title**: Quality
- **Identifier**:
  [https://linz.github.io/stac/extensions/quality/v0.0.4/schema.json]()
- **Field Name Prefix**: quality
- **Scope**: Collection
- **Extension
  [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):**
  Proposal
- **Owner**: @billgeo @imincik @l0b0 @MitchellPaff

## Collection Fields

| Field Name                       | Type   | Description                                                                                                  |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| quality:description              | string | Information or description relating to the quality of the dataset.                                           |
| quality:horizontal_accuracy      | number | The horizontal accuracy of the dataset. Must be in units of metres.                                          |
| quality:horizontal_accuracy_type | string | The type of accuracy for the horizontal accuracy value. Options are "Nominal" and "95% confidence interval". |
