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

describe('Camera item', { timeout: DefaultTimeoutMillis }, () => {
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

  it("Example with an incorrect 'camera:sequence_number' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.properties['camera:sequence_number'] = 'incorrect_value';

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/properties/camera:sequence_number' && error.message === 'must be integer',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
