# LINZ Metadata Extension Specification

- **Title:** LINZ Metadata
- **Identifier:** <https://github.com/stac-extensions/processing/blob/v0.0.1/extensions/linz_metadata/json-schema/schema.json> (TBC)
- **Field Name Prefix:** linz_metadata
- **Scope:** Collection
- **Extension [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):** Proposal

The LINZ Metadata STAC extension covers metadata that LINZ requires or recommends that data managers record about their datasets at the dataset level for metadata record management / publishing purposes.

This extension applies to STAC Collections. The fields below are added at the Collection level which maps to what LINZ considers to be a "dataset". Note that datasets are "per survey" for Aerial Imagery, Historical Aerial Photos and Elevation Data.

- Examples (TBC):
  - [Collection example](examples/collection.json): Shows the basic usage of the extension in a STAC Collection
- [JSON Schema](json-schema/schema.json)
- [Changelog](./CHANGELOG.md)

## Collection Fields

| Field Name                               | Type                                       | Description |
| ---------------------------------------- | ------------------------------------------ | ----------- |
| linz_metadata:id                         | string                                     | **REQUIRED.** Persistent unique identifier for the metadata record. |
| linz_metadata:updated                    | datetime                                   | **REQUIRED.** Last time the metadata was updated. |
| linz_metadata:standard_name              | string                                     | **REQUIRED.** The name of the metadata standard that the dataset is published as. |
| linz_metadata:language                   | string                                     | **REQUIRED.** The metadata language. |
| linz_metadata:character_set              | string                                     | **REQUIRED.** The metadata character set. |
| linz_metadata:contact                    | Provider Object                            | **REQUIRED.** The entity to be contacted with questions regarding the metadata. |
| linz_metadata:license                    | string                                     | **REQUIRED.** A legal instrument governing the use constraints of the metadata record. |
