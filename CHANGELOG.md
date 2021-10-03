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
