#!/usr/bin/env bash

set -o errexit -o nounset
shopt -s failglob

validator_command=(
    node_modules/.bin/stac-node-validator
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/historical-imagery/schema.json=extensions/historical-imagery/schema.json
)
"${validator_command[@]}" extensions/historical-imagery/examples/*.json
