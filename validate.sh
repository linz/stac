#!/usr/bin/env bash

set -o errexit -o nounset
shopt -s failglob

validator_command=(
    node_modules/.bin/stac-node-validator
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/template/schema.json=extensions/template/schema.json
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/aerial_photo/schema.json=extensions/aerial_photo/schema.json
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/camera/schema.json=extensions/camera/schema.json
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/film/schema.json=extensions/film/schema.json
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/scanning/schema.json=extensions/scanning/schema.json
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/quality/schema.json=extensions/quality/schema.json
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/linz/schema.json=extensions/linz/schema.json
)
"${validator_command[@]}" extensions/*/examples/*.json

for path in extensions/*/non-examples/*.json
do
    if "${validator_command[@]}" "$path"
    then
        echo "Valid non-example: ${path}" >&2
        exit_code=1
    fi
done

exit "${exit_code-0}"
