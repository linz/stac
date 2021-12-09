import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

o.spec('Film Extension Collection', () => {
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

  o("Summaries with no 'film:id' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['film:id'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'film:id'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'film:id' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['film:id'] = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/summaries/film:id' && error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'film:physical_condition' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['film:physical_condition'] = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/film:physical_condition' &&
          error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'film:physical_size' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['film:physical_size'] = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/film:physical_size' &&
          error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with no 'film:negative_sequence' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['film:negative_sequence'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries' &&
          error.message === "must have required property 'film:negative_sequence'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
