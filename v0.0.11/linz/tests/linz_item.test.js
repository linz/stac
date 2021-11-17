import o from 'ospec';
import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import Ajv from 'ajv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('LINZ item', () => {
  o.specTimeout(DefaultTimeoutMillis);
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('Example should pass validation', async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(example);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Example without 'linz:geospatial_type' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:geospatial_type'];

    // when
    const valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.dataPath === '' && error.message === "should have required property '['linz:geospatial_type']'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Example with invalid 'linz:geospatial_type' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:geospatial_type'] = 'incorrect_example';

    // when
    const valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.dataPath === "['linz:geospatial_type']" &&
          error.message === 'should be equal to one of the allowed values',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Asset with no 'created' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['created'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.dataPath === ".assets['example']" && error.message === "should have required property 'created'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Asset with no 'updated' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['updated'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.dataPath === ".assets['example']" && error.message === "should have required property 'updated'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Asset with no 'file:checksum' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['file:checksum'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.dataPath === ".assets['example']" &&
          error.message === "should have required property '['file:checksum']'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
