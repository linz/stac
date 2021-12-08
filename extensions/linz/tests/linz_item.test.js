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
          error.instancePath === '/assets/example' && error.message === "must have required property 'created'",
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
          error.instancePath === '/assets/example' && error.message === "must have required property 'updated'",
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
          error.instancePath === '/assets/example' && error.message === "must have required property 'file:checksum'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Asset with no 'linz:language' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['linz:language'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(true);
  });

  o("Example with an incorrect 'created' asset field type should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['assets']['example']['created'] = 1234;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/assets/example/created' && error.message === 'must be string',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
