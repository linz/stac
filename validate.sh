#!/bin/bash
node_modules/.bin/stac-node-validator \
    --schemaMap=https://stac-extensions.github.io/template/v1.0.0/schema.json=extensions/template/json-schema/schema.json \
    --schemaMap=https://linz.github.io/stac/extensions/camera/v1.0.0/schema.json=extensions/camera/json-schema/schema.json \
    --schemaMap=https://linz.github.io/stac/extensions/quality/v1.0.0/schema.json=extensions/quality/json-schema/schema.json \
    --schemaMap=https://linz.github.io/stac/extensions/linz/v1.0.0/schema.json=extensions/linz/json-schema/schema.json \
    $@