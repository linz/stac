import Ajv from 'ajv';
import { promises as fs } from 'fs';
import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

describe('Film item', { timeout: DefaultTimeoutMillis }, () => {
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

  it("Example with an incorrect 'film:id' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.properties['film:id'] = 1234;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/properties/film:id' && error.message === 'must be string',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without a mandatory 'film:id' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['film:id'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/properties' && error.message === "must have required property 'film:id'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example with an incorrect 'film:negative_sequence' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.properties['film:negative_sequence'] = 'incorrect_example';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/properties/film:negative_sequence' && error.message === 'must be integer',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without a mandatory 'film:negative_sequence' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['film:negative_sequence'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/properties' &&
          error.message === "must have required property 'film:negative_sequence'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
