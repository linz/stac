# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `linz:geospatial_category` collection field.
- `linz:historic_survey_number` collection field.
- `chatham-islands` value for `linz:region`.

### Changed

- `linz:slug` collection field documented in README.

### Deprecated

### Removed

- `linz:asset_summaries`, `linz:geospatial_type`, `linz:history`, `linz:providers` and `linz:update_frequency`
  collection fields removed (not used in production).
- `linz:language` asset field removed (not used in production).
- `summaries.created`, `summaries.updated` and `summaries.datetime` removed (not used in production).
- Projection, quality and version extensions are no longer included in the LINZ extension.

### Fixed