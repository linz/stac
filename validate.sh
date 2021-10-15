#!/usr/bin/env bash

set -o errexit -o nounset
shopt -s failglob globstar

validator_command=(
    node_modules/.bin/stac-node-validator
    --schemaMap=https://linz.github.io/stac/extensions/_STAC_VERSION_/template/schema.json=extensions/template/schema.json
    --schemaMap=https://linz.github.io/stac/extensions/_STAC_VERSION_/aerial-photo/schema.json=extensions/aerial-photo/schema.json
    --schemaMap=https://linz.github.io/stac/extensions/_STAC_VERSION_/camera/schema.json=extensions/camera/schema.json
    --schemaMap=https://linz.github.io/stac/extensions/_STAC_VERSION_/film/schema.json=extensions/film/schema.json
    --schemaMap=https://linz.github.io/stac/extensions/_STAC_VERSION_/scanning/schema.json=extensions/scanning/schema.json
    --schemaMap=https://linz.github.io/stac/extensions/_STAC_VERSION_/quality/schema.json=extensions/quality/schema.json
    --schemaMap=https://linz.github.io/stac/extensions/_STAC_VERSION_/linz/schema.json=extensions/linz/schema.json
    --schemaMap=https://linz.github.io/stac/schemas/_STAC_VERSION_/linz/schema.json=schemas/linz/schema.json
)

"${validator_command[@]}" ./**/examples/*.json
