#!/bin/bash
node_modules/.bin/stac-node-validator \
    --schemaMap=https://stac-extensions.github.io/template/v1.0.0/schema.json=extensions/template/schema.json \
    --schemaMap=https://linz.github.io/stac/__STAC_VERSION__/camera/schema.json=extensions/camera/schema.json \
    --schemaMap=https://linz.github.io/stac/__STAC_VERSION__/quality/schema.json=extensions/quality/schema.json \
    --schemaMap=https://linz.github.io/stac/__STAC_VERSION__/linz/schema.json=extensions/linz/schema.json \
    $@