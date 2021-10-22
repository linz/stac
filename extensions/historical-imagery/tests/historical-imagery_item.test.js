import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('Historical Imagery item', () => {
  o.specTimeout(DefaultTimeoutMillis);
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  //   WIP

  //   o('Example should pass validation', async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));

  //     // when
  //     const valid = validate(example);

  //     // then
  //     o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  //   });

  //   o("Example without 'id' property should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     delete example['id'];

  //     // when
  //     const valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(
  //       validate.errors.some(
  //         (error) => error.dataPath === '' && error.message === "should have required property '['id']'",
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });

  //   o("Example with invalid 'linz:geospatial_type' value should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     example['linz:geospatial_type'] = 'incorrect_example';

  //     // when
  //     const valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(
  //       validate.errors.some(
  //         (error) =>
  //           error.dataPath === "['linz:geospatial_type']" &&
  //           error.message === 'should be equal to one of the allowed values',
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });

  //   o("Asset with no 'created' property should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     delete example['assets']['example']['created'];

  //     // when
  //     let valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(
  //       validate.errors.some(
  //         (error) =>
  //           error.dataPath === ".assets['example']" && error.message === "should have required property 'created'",
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });

  //   o("Asset with no 'updated' property should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     delete example['assets']['example']['updated'];

  //     // when
  //     let valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(
  //       validate.errors.some(
  //         (error) =>
  //           error.dataPath === ".assets['example']" && error.message === "should have required property 'updated'",
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });

  //   o("Asset with no 'file:checksum' property should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     delete example['assets']['example']['file:checksum'];

  //     // when
  //     let valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(
  //       validate.errors.some(
  //         (error) =>
  //           error.dataPath === ".assets['example']" &&
  //           error.message === "should have required property '['file:checksum']'",
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });
});
