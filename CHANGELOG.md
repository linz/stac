## [0.0.15](https://github.com/linz/stac/compare/v0.0.14...v0.0.15) (2022-03-30)

### Bug Fixes

- remove requirement for processing:software field in Historical Imagery extension TDE-343 ([#220](https://github.com/linz/stac/issues/220)) ([aebe081](https://github.com/linz/stac/commit/aebe081ce9256b3c98dbab5fb10653a284fe3f15))
- tidy historical imagery examples TDE-338 ([#222](https://github.com/linz/stac/issues/222)) ([55e6de6](https://github.com/linz/stac/commit/55e6de63c08e40d1421cfb5d383c5c95b65c1c31))

### Features

- **historical-imagery:** add quality:description to collection ([#217](https://github.com/linz/stac/issues/217)) ([6c68da3](https://github.com/linz/stac/commit/6c68da3d6574af75fdc89d2dd1852d095bbd63dc))

## [0.0.14](https://github.com/linz/stac/compare/v0.0.13...v0.0.14) (2021-12-09)

### Features

- require additional fields for historical imagery (require linz extension) ([#199](https://github.com/linz/stac/issues/199)) ([839821f](https://github.com/linz/stac/commit/839821fd982046be58f869ac61d574e36c93ad1e))

## [0.0.13](https://github.com/linz/stac/compare/v0.0.12...v0.0.13) (2021-12-09)

### Features

- fields.json ([#197](https://github.com/linz/stac/issues/197)) ([29c742f](https://github.com/linz/stac/commit/29c742f2885e184c7e62448549ce851f360a2aa4))
- Fix strict ajv warnings ([#167](https://github.com/linz/stac/issues/167)) ([d2f7daa](https://github.com/linz/stac/commit/d2f7daa67d010ac8ffe1c8ff380cbc2fc9453d96))
- Verify ospec stderr output ([#198](https://github.com/linz/stac/issues/198)) ([5017d6c](https://github.com/linz/stac/commit/5017d6c6025a248d618dbd50d6870ff8809a2826))

## [0.0.12](https://github.com/linz/stac/compare/v0.0.11...v0.0.12) (2021-12-02)

### Bug Fixes

- broken links on readme web pages and link consistency ([#196](https://github.com/linz/stac/issues/196)) ([44f30b2](https://github.com/linz/stac/commit/44f30b289423470c51bec328cf50d4435715b49a))
- Enforce `minItems` ([#191](https://github.com/linz/stac/issues/191)) ([3b40f03](https://github.com/linz/stac/commit/3b40f031a11df3f2a5789b1823ea846b0a8b3f50))
- historical imagery should not require instruments field ([#192](https://github.com/linz/stac/issues/192)) ([1c6808c](https://github.com/linz/stac/commit/1c6808cbfbb25fc9e6f508d14bca34beb8a338df))
- **historical Imagery:** allow null values in proj:epsg summary ([#193](https://github.com/linz/stac/issues/193)) ([bec30ec](https://github.com/linz/stac/commit/bec30ecc15cd691671ed6497abcd812a44fc5e57))
- Make `linz:language` optional ([#180](https://github.com/linz/stac/issues/180)) ([19ee412](https://github.com/linz/stac/commit/19ee41282bd3af2bface6b00c72d831c363f8efb))

### Features

- Add asset language property ([#173](https://github.com/linz/stac/issues/173)) ([66bd0d5](https://github.com/linz/stac/commit/66bd0d573d279fc2c29e6c47f0232ad952893497))
- add IR linz:geospatial_types ([#188](https://github.com/linz/stac/issues/188)) ([807cdb2](https://github.com/linz/stac/commit/807cdb2f157993e4163761c2418eb8a46765017a))
- Add new optional 'linz:update_frequency' field to the linz exte… ([#164](https://github.com/linz/stac/issues/164)) ([22ba48e](https://github.com/linz/stac/commit/22ba48e76f222152b276b484f34d20c43a3f8864))
- add summaries to historical imagery related extensions ([#176](https://github.com/linz/stac/issues/176)) ([56e130e](https://github.com/linz/stac/commit/56e130ef3df464b7ee76370ec57b98ea331b8ac1))
- Create asset summaries ([#157](https://github.com/linz/stac/issues/157)) ([497c182](https://github.com/linz/stac/commit/497c18253390cd8e2b6801c93191cc67f165014d))
- Make summary `updated` and `created` optional ([#187](https://github.com/linz/stac/issues/187)) ([7068e7d](https://github.com/linz/stac/commit/7068e7dfc3e3cc4c47f1feeff9e794da8a2d4529))
- Tweak geospatial type implementation ([#172](https://github.com/linz/stac/issues/172)) ([966292d](https://github.com/linz/stac/commit/966292d254d163472bbe6feea27b239a6be2c3dc))
- Use latest ajv ([#166](https://github.com/linz/stac/issues/166)) ([889bc08](https://github.com/linz/stac/commit/889bc08006255fb40e5fe7e7ab96800defa20098))

## [0.0.11](https://github.com/linz/stac/compare/v0.0.10...v0.0.11) (2021-11-17)

### Bug Fixes

- change linz.github.io/stac to stac.linz.govt.nz ([#149](https://github.com/linz/stac/issues/149)) ([fff84dc](https://github.com/linz/stac/commit/fff84dc70fd847c8e8fb138d90f07b9b5542b838))
- example datetimes to NZ time, remove ms, add scan date-time format (TDE-207) ([#147](https://github.com/linz/stac/issues/147)) ([562df5d](https://github.com/linz/stac/commit/562df5d85ddfa6d5d600ccd19ce22076e9334a76))
- README updates: remove camera 'vender' reference, h-i require eo:bands ([#148](https://github.com/linz/stac/issues/148)) ([7443877](https://github.com/linz/stac/commit/7443877bda35b5b519cb213c3b5dfb20d351a73d))
- remove eo and file extensions from examples ([#168](https://github.com/linz/stac/issues/168)) ([6f4d30a](https://github.com/linz/stac/commit/6f4d30ad3b5e2341be2257621bb4990a3cb15319))
- updated extension examples and h-i test ([#155](https://github.com/linz/stac/issues/155)) ([a925f34](https://github.com/linz/stac/commit/a925f34585c60dbb20805287fcb42a0f4da515b9))

### Features

- add STAC Collections to extensions (TDE-232) ([#165](https://github.com/linz/stac/issues/165)) ([b7a3eb8](https://github.com/linz/stac/commit/b7a3eb805710d1ceeea514003bdc4b6d12326cd5))

## [0.0.10](https://github.com/linz/stac/compare/v0.0.9...v0.0.10) (2021-11-01)

### Bug Fixes

- historical imagery collection stac_extension ([#136](https://github.com/linz/stac/issues/136)) ([edad186](https://github.com/linz/stac/commit/edad186e8fed56bc5a095eeec63520846048fe1e))
- linz readme bullet point formatting ([#132](https://github.com/linz/stac/issues/132)) ([7f02972](https://github.com/linz/stac/commit/7f0297286a00ac2530fb0a5842fc1e1685a00d1d))
- update template schema to latest ([#126](https://github.com/linz/stac/issues/126)) ([8fbe466](https://github.com/linz/stac/commit/8fbe4669fff825b19e16f5b7bbd0ad19e6619d66))

### Features

- Duplicate referenced field documentation in table ([#138](https://github.com/linz/stac/issues/138)) ([9376923](https://github.com/linz/stac/commit/9376923a6bef275444ed463e6ffe4fe19ca2d576))
- enable jekyll for linz style ([#123](https://github.com/linz/stac/issues/123)) ([a6740ce](https://github.com/linz/stac/commit/a6740ce286341ad602e5406571acdbd20b460517))
- historical imagery providers (TDE-146) ([#141](https://github.com/linz/stac/issues/141)) ([997ebcf](https://github.com/linz/stac/commit/997ebcf9af7cbfa9ce535c90da0374ea8c1caa7f))
- historical imagery schema ([#133](https://github.com/linz/stac/issues/133)) ([bc94729](https://github.com/linz/stac/commit/bc94729f1b8b79ddd85af3b14aa20b9f0d3a86ac))
- Make processing extension recommended ([#137](https://github.com/linz/stac/issues/137)) ([c3a48cd](https://github.com/linz/stac/commit/c3a48cd19ad91abc9fdc5683e7a7c5627a4cc5bc))
- Move quality:lineage to linz:history ([#140](https://github.com/linz/stac/issues/140)) ([14befef](https://github.com/linz/stac/commit/14befef671553380aa13b34e98499693313d8d69))
- move to stac.linz.govt.nz for the schemas ([#124](https://github.com/linz/stac/issues/124)) ([e8167d1](https://github.com/linz/stac/commit/e8167d10e71050f98ba7b41c022b4aa28eef6296))
- Refer to example files recursively ([#129](https://github.com/linz/stac/issues/129)) ([db3171a](https://github.com/linz/stac/commit/db3171a51c8ec7044b55a677ae7d1523ed7b017b))

## [0.0.9](https://github.com/linz/stac/compare/v0.0.8...v0.0.9) (2021-10-13)

### Features

- add geospatial type summary for linz collections ([#113](https://github.com/linz/stac/issues/113)) ([25496be](https://github.com/linz/stac/commit/25496bead8f1b978a53218a9056df30c382703ef))
- Make `file:checksum` asset property required ([#117](https://github.com/linz/stac/issues/117)) ([4bb30ec](https://github.com/linz/stac/commit/4bb30ec86c83750fe6b6f1b337cf7c0f4abc00bc))

## [0.0.8](https://github.com/linz/stac/compare/v0.0.7...v0.0.8) (2021-10-12)

### Bug Fixes

- Include real projection extension fields ([#87](https://github.com/linz/stac/issues/87)) ([95322f8](https://github.com/linz/stac/commit/95322f8a79987af001d425ecafe9756b2734ab01))
- Include third party schemas on top level ([#101](https://github.com/linz/stac/issues/101)) ([da277db](https://github.com/linz/stac/commit/da277db43b966b23ada4dc42e606329e389cf1eb))
- Make quality `stac_extensions` entry mandatory ([#88](https://github.com/linz/stac/issues/88)) ([3729952](https://github.com/linz/stac/commit/372995244d9fccdf4ff4a6282925a90deb88d918))
- rename to historical-imagery and update readme TDE-167 ([#84](https://github.com/linz/stac/issues/84)) ([6bf326f](https://github.com/linz/stac/commit/6bf326f414b4f72310e104abb557cf54fab80624))
- Repair tests ([#93](https://github.com/linz/stac/issues/93)) ([1d9920d](https://github.com/linz/stac/commit/1d9920d3b1ab89a3c1b72e48a0d725a87187d734))
- use longer default timeout when test has to download schema ([#102](https://github.com/linz/stac/issues/102)) ([ed9916a](https://github.com/linz/stac/commit/ed9916a65622456c2532a9b58c9bd92ea4058269))
- validate that both manager and custodian roles are populated in … ([#111](https://github.com/linz/stac/issues/111)) ([8573048](https://github.com/linz/stac/commit/8573048932d05c57bf9ad90f06f302c8fbfa305c))

### Features

- add new linz item metadata schema ([#75](https://github.com/linz/stac/issues/75)) ([31d128e](https://github.com/linz/stac/commit/31d128e6f2094657a49e5a95ea2662f645cb8fff))
- add unit tests for template extension ([#95](https://github.com/linz/stac/issues/95)) ([d1af8ed](https://github.com/linz/stac/commit/d1af8ed767b03c50e7ea72d1ea0ded9a961f0e97))
- add unit tests for the quality extension ([#96](https://github.com/linz/stac/issues/96)) ([282312c](https://github.com/linz/stac/commit/282312cd2b79b1207ba7fe8b61f3a9658b9c32ac))
- added ability to load schemas from url at compile time ([#82](https://github.com/linz/stac/issues/82)) ([02f19d7](https://github.com/linz/stac/commit/02f19d76acbcda89aa8869486c54e9fb41adcadd))
- Lowercase enum values ([#99](https://github.com/linz/stac/issues/99)) ([8167ec5](https://github.com/linz/stac/commit/8167ec584da27a5d4e941a58a1f33100fb9cbc22))
- Make provider types mandatory ([#89](https://github.com/linz/stac/issues/89)) ([ead7245](https://github.com/linz/stac/commit/ead72456a20b95e7532b4947f0880d2e8d5b4d18))
- replace remaining non-examples with unit tests ([#104](https://github.com/linz/stac/issues/104)) ([70261cf](https://github.com/linz/stac/commit/70261cf917eb8c449a6e06c96cc534975f9d3c54))
- Summarise created and updated datetimes ([#109](https://github.com/linz/stac/issues/109)) ([d6ec59c](https://github.com/linz/stac/commit/d6ec59c9320bd02392ad1bebd7024e04b1335a80))

### Reverts

- Revert "docs: improve geospatial_type descriptions" ([7519821](https://github.com/linz/stac/commit/7519821d0cc17806fa572229678ba68d9da0ce65))
- Revert "docs: lower-case geospatial_type names" ([2684d4d](https://github.com/linz/stac/commit/2684d4df7c6617a3dbc538847065fab9b30697ac))

## [0.0.7](https://github.com/linz/stac/compare/v0.0.6...v0.0.7) (2021-10-03)

### Features

- Add issue templates ([#68](https://github.com/linz/stac/issues/68)) ([bdd3c14](https://github.com/linz/stac/commit/bdd3c14d77f6c51aab90cd7bafeac5eb0f4a7243))
- make projection extension mandatory ([#70](https://github.com/linz/stac/issues/70)) ([e9d0ec3](https://github.com/linz/stac/commit/e9d0ec32c63590605bf0315ddfbb242e1a14e732))
- Support Nix ([#67](https://github.com/linz/stac/issues/67)) ([a4f765b](https://github.com/linz/stac/commit/a4f765b30f3faa4380a74c6a3b56eb28c8238ad7))
- unit testing with ospec ([#76](https://github.com/linz/stac/issues/76)) ([5879d84](https://github.com/linz/stac/commit/5879d8456fa04ab06e6918f9b6098d7f7a3a5176))

### Reverts

- reinstate stac_extensions schema definitions ([#65](https://github.com/linz/stac/issues/65)) ([7418626](https://github.com/linz/stac/commit/7418626606a759c3c3f2d3a3a7e5668c18c956f5)), closes [/github.com/linz/stac/pull/60#discussion_r715257218](https://github.com//github.com/linz/stac/pull/60/issues/discussion_r715257218)

## [0.0.6](https://github.com/linz/stac/compare/v0.0.3...v0.0.6) (2021-09-28)

### Bug Fixes

- removed duplicate validation of the title property in the qualit… ([#52](https://github.com/linz/stac/issues/52)) ([af90938](https://github.com/linz/stac/commit/af90938e162041de0b213072ce72e13936e796be))

### Features

- Add editor configuration ([#54](https://github.com/linz/stac/issues/54)) ([472b15e](https://github.com/linz/stac/commit/472b15ecbce77efda3f1d37e50153123f162f1cc))
- Add key LINZ extension properties ([#61](https://github.com/linz/stac/issues/61)) ([41a1324](https://github.com/linz/stac/commit/41a13241e28e3521cf072a947398eabacc590415))
- Add new providers, lifecycle and lineage fields to linz ext ([#69](https://github.com/linz/stac/issues/69)) ([29529b1](https://github.com/linz/stac/commit/29529b1d24092622e3a9177e2887cc9ecd56cbd2))
- added negative json examples to verify schemas negatively ([#46](https://github.com/linz/stac/issues/46)) ([f5acad2](https://github.com/linz/stac/commit/f5acad2155e76595081629a5f18f05575f413a76))
- added new fields in quality extension ([#59](https://github.com/linz/stac/issues/59)) ([1b4555c](https://github.com/linz/stac/commit/1b4555c6e4d19d82353141fa731a17e3ced38990))
- Create aerial photography extension ([#66](https://github.com/linz/stac/issues/66)) ([d5d8c59](https://github.com/linz/stac/commit/d5d8c59a000333ba4b5dd18d3cdc2ffdbb2d7236))
- Create film extension ([#60](https://github.com/linz/stac/issues/60)) ([e3f7058](https://github.com/linz/stac/commit/e3f7058121128b9794ef1093c081e55be2c3b1c5))
- Create scanning extension ([#55](https://github.com/linz/stac/issues/55)) ([9e983ab](https://github.com/linz/stac/commit/9e983ab0bfe59a5c42167880d637e8eaa72a01f2))

### Reverts

- remove failed versions ([4a83d42](https://github.com/linz/stac/commit/4a83d4218e00f69cd7588d1f3bee4c074f09e270))

## [0.0.4](https://github.com/linz/STAC/compare/v0.0.3...v0.0.4) (2021-09-22)

### Bug Fixes

- modified the json-schema for linz properties to copy stac ([#45](https://github.com/linz/STAC/issues/45)) ([49677de](https://github.com/linz/STAC/commit/49677de6c193fad0049e0bea555dccabb26a420a))
- Specify command to release new version ([#44](https://github.com/linz/STAC/issues/44)) ([4b32a34](https://github.com/linz/STAC/commit/4b32a34c579f5099fe7a2c17986698a5555dafaf))

## [0.0.3](https://github.com/linz/stac/compare/v0.0.2...v0.0.3) (2021-09-21)

### Bug Fixes

- Replace version placeholder in all extension files ([#42](https://github.com/linz/stac/issues/42)) ([3db8d61](https://github.com/linz/stac/commit/3db8d618940897e7f7931b16d948f25d7b0fc472))

## [0.0.2](https://github.com/linz/stac/compare/v0.0.1...v0.0.2) (2021-09-20)

### Bug Fixes

- Use portable shebang line ([#37](https://github.com/linz/stac/issues/37)) ([bba2f63](https://github.com/linz/stac/commit/bba2f6348be563e6827751533be20bf1be633591))

### Features

- added new mandatory fields to LINZ STAC schema ([#28](https://github.com/linz/stac/issues/28)) ([58687a1](https://github.com/linz/stac/commit/58687a1c252f85236f79300ee2cdf61e7abeefd2))

## 0.0.1 (2021-09-17)

### Bug Fixes

- **historical_imagery:** correct scope to STAC Item ([5407179](https://github.com/linz/stac/commit/54071794af4c7e770e8ae2f9b9807bc2d0bba5eb))
- **historical_imagery:** remove everything from linz: namespace ([2b3fd7d](https://github.com/linz/stac/commit/2b3fd7d9a0104b34c37590202bd77b257c5d891f))
- **historical_imagery:** remove example of bbox to reduce line size ([a81e41c](https://github.com/linz/stac/commit/a81e41c4b57794a3dbce729ae9225bbc86960587))

### Features

- Add Dependabot configuration for NPM ([f83a21a](https://github.com/linz/stac/commit/f83a21a30ac3027dec23009baf00754e1e5ebef9))
- add kodiak toml file ([#17](https://github.com/linz/stac/issues/17)) ([36826f9](https://github.com/linz/stac/commit/36826f96af6189e11799f42dcf9f0212f63c6efc))
- Add prettier linter/formatter ([#7](https://github.com/linz/stac/issues/7)) ([fe90b98](https://github.com/linz/stac/commit/fe90b98f26c80e281dacf3a83cd4f4216319ae0e))
- camera extension ([#10](https://github.com/linz/stac/issues/10)) ([f3b4ad0](https://github.com/linz/stac/commit/f3b4ad0be0240f5815ebe327e6fad06b530db5a7))
- create LINZ top level Collection extension (closes [#850](https://github.com/linz/stac/issues/850)) ([b0c1df0](https://github.com/linz/stac/commit/b0c1df0fdec2c56e0575fd1393f231399c1bdca9))
- Create quality extension ([#5](https://github.com/linz/stac/issues/5)) ([49aaf21](https://github.com/linz/stac/commit/49aaf21177ba8f932967ab0e6beeeed1237967f2))
- initial commit ([b11d162](https://github.com/linz/stac/commit/b11d1626d0cce676533bd0954ae0c17f7b4077f9))
- Introduce STAC template ([#9](https://github.com/linz/stac/issues/9)) ([6320b0b](https://github.com/linz/stac/commit/6320b0b240552deace99d9087d4d3327dbf35bbc))
