import Ajv from 'ajv';
import { promises as fs } from 'fs';
import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

describe('Film Extension Collection', { timeout: DefaultTimeoutMillis }, () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  it('Example should pass validation', async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
  });

  it('Missing summaries section should pass validation', async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
  });

  it("Summaries with no 'film:id' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['film:id'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'film:id'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with empty 'film:id' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['film:id'] = [];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/summaries/film:id' && error.message === 'must NOT have fewer than 1 items',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with empty 'film:physical_condition' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['film:physical_condition'] = [];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/film:physical_condition' &&
          error.message === 'must NOT have fewer than 1 items',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with empty 'film:physical_size' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['film:physical_size'] = [];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/film:physical_size' &&
          error.message === 'must NOT have fewer than 1 items',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with no 'film:negative_sequence' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['film:negative_sequence'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries' &&
          error.message === "must have required property 'film:negative_sequence'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
