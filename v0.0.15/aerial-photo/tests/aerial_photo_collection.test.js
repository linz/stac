import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

o.spec('Aerial Photo Extension Collection', () => {
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
    let valid = validate(example);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o('Missing summaries section should pass validation', async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Summaries with no 'aerial-photo:run' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['aerial-photo:run'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries' && error.message === "must have required property 'aerial-photo:run'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'aerial-photo:anomalies' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['aerial-photo:anomalies'] = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/aerial-photo:anomalies' &&
          error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'aerial-photo:run' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['aerial-photo:run'] = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/aerial-photo:run' && error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with no 'aerial-photo:sequence_number' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['aerial-photo:sequence_number'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries' &&
          error.message === "must have required property 'aerial-photo:sequence_number'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
