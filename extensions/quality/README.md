# Quality Extension Specification

**This is a work in progress and has not been reviewed everything is likely to
change**

- **Title**: Quality
- **Identifier**:
  [https://linz.github.io/STAC/extensions/quality/v1.0.0/schema.json]()
- **Field Name Prefix**: quality
- **Scope**: Collection
- **Extension Classification**: Work In Progress (Before proposal)

## Collection Fields

| Field Name                       | Type   | Description                                                                                                  |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| quality:description              | string | Information or description relating to the quality of the dataset.                                           |
| quality:horizontal_accuracy      | number | The horizontal accuracy of the dataset. Must be in units of metres.                                          |
| quality:horizontal_accuracy_type | string | The type of accuracy for the horizontal accuracy value. Options are "Nominal" and "95% confidence interval". |
