import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import Ajv from 'ajv';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

describe('Aerial Photo Extension Item', { timeout: DefaultTimeoutMillis }, () => {
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

  it("Example with an incorrect 'aerial-photo:run' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.properties['aerial-photo:run'] = 1234;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/properties/aerial-photo:run' && error.message === 'must be string',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without the mandatory 'aerial-photo:run' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['aerial-photo:run'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/properties' && error.message === "must have required property 'aerial-photo:run'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without a mandatory 'aerial-photo:sequence_number' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['aerial-photo:sequence_number'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/properties' &&
          error.message === "must have required property 'aerial-photo:sequence_number'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example with an incorrect 'aerial-photo:sequence_number' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.properties['aerial-photo:sequence_number'] = 'incorrect_example';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/properties/aerial-photo:sequence_number' && error.message === 'must be integer',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
