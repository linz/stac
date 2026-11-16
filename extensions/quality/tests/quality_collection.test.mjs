import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import Ajv from 'ajv';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

describe('Quality collection', { timeout: DefaultTimeoutMillis }, () => {
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
    let valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
  });

  it("Example with an incorrect 'quality:description' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['quality:description'] = 1234;

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/quality:description' && error.message === 'must be string',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example which contains a value for the 'quality:horizontal_accuracy_type' field which isn't one of the enumerated values should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['quality:horizontal_accuracy_type'] = 'Good';

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/quality:horizontal_accuracy_type' &&
          error.message === 'must be equal to one of the allowed values',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example which contains a value for the 'quality:vertical_accuracy_type' field which isn't one of the enumerated values should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['quality:vertical_accuracy_type'] = 'Good';

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/quality:vertical_accuracy_type' &&
          error.message === 'must be equal to one of the allowed values',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
