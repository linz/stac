# LINZ Dataset Extension Specification

- **Title:** LINZ Dataset
- **Identifier:** <https://github.com/stac-extensions/processing/blob/v0.0.1/extensions/linz_dataset/json-schema/schema.json>
- **Field Name Prefix:** linz_dataset
- **Scope:** Collection
- **Extension [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):** Proposal

The LINZ Dataset STAC extension covers metadata that LINZ requires or recommends that data managers record about their datasets at the dataset level.

This extension applies to STAC Collections. The fields below are added at the Collection level which maps to what LINZ considers to be a "dataset". Note that datasets are "per survey" for Aerial Imagery, Historical Aerial Photos and Elevation Data.

- Examples (TBC):
  - [Collection example](examples/collection.json): Shows the basic usage of the extension in a STAC Collection
- [JSON Schema](json-schema/schema.json)
- [Changelog](./CHANGELOG.md)

## Collection Fields

| Field Name                               | Type                                       | Description |
| ---------------------------------------- | ------------------------------------------ | ----------- |
| title                                    | string                                     | **REQUIRED.** A short descriptive one-line title for the Collection. |
| linz_dataset:purpose                     | string                                     | **REQUIRED.** Description of the purpose of the dataset to help a customer evaluate the suitability of a dataset. |
| linz_dataset:data_manager                | Map<string, string>                        | **REQUIRED.** A dictionary with the role/person for the key/value describing the data manager. For example, `"Data Manager":"Joe Bloggs"` |
| linz_dataset:content_type                | string                                     | **REQUIRED.** A general description of the type of content that can be found in the dataset. |
| linz_dataset:item_count                  | integer                                    | The number of associated items that make up a dataset. |
| linz_dataset:classification_code         | string                                     | **REQUIRED.** Describes the security classification from the [NZ Government Security Classification System](https://www.digital.govt.nz/standards-and-guidance/governance/managing-online-channels/security-and-privacy-for-websites/foundations/classify-information/). |
| linz_dataset:status                      | string                                     | **REQUIRED.** Describes the phase of the dataset lifecycle. |
| deprecated                               | boolean                                    | **REQUIRED.** Specifies that the Collection or Item is deprecated with the potential to be removed. Defaults to false. |
| linz_dataset:lineage                     | string                                     | **REQUIRED.** Contains a descriptive statement about the lineage/history of a dataset. |
| linz_dataset:change_log                  | \[[Change Log Object](#change-log-object)] | **REQUIRED.** Contains a log of changes that have occurred within the dataset. |
| linz_dataset:generated_software          | string                                     | Contains the software information that was used to generate the dataset. Must be in the form of a URI to the software package. |
| linz_dataset:generated_software_revision | string                                     | Contains the software version information that was used to generate the dataset. Could contain either major.minor.patch format or a git hash ref. |
| linz_dataset:update_frequency            | string                                     | Indicates how frequently an updated dataset may be distributed to the publication platform. |
| linz_dataset:language                    | string                                     | **REQUIRED.** Language used in the dataset. |
| linz_dataset:character_set               | string                                     | **REQUIRED.** Character encoding standard used for the dataset. |
| linz_dataset:copyright                   | string                                     | **REQUIRED.** Copyright statement, recognising the rights holder (who can then license the dataset for re-use). |

### Change Log Object

The object describes the spatio-temporal extents of the Collection. Both spatial and temporal extents are required to be specified.

| Element  | Type     | Description                                                                                                          |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| date     | datetime | Date/time that the dataset or metadata was updated and published internally.                                         |
| version  | string   | Identifies the version of the dataset.                                                                               |
| message  | string   | Use the message to explain what has changed, why the changes was needed, and ideally how the change was carried out. |
| added    | integer  | Count of added features/rows/tiles automatically populated from the dataset change.                                  |
| modified | integer  | Count of modified features/rows/tiles automatically populated from the dataset change.                               |
| deleted  | integer  | Count of deleted features/rows/tiles automatically populated from the dataset change.                                |
