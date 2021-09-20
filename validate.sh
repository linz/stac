#!/usr/bin/env bash
node_modules/.bin/stac-node-validator \
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/template/schema.json=extensions/template/schema.json \
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/camera/schema.json=extensions/camera/schema.json \
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/quality/schema.json=extensions/quality/schema.json \
    --schemaMap=https://linz.github.io/stac/_STAC_VERSION_/linz/schema.json=extensions/linz/schema.json \
    ${@+"$@"}
