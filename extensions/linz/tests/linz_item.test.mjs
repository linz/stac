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

describe('LINZ item', { timeout: DefaultTimeoutMillis }, () => {
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

  it("Asset with no 'created' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['created'];

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/assets/example' && error.message === "must have required property 'created'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Asset with no 'updated' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['updated'];

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/assets/example' && error.message === "must have required property 'updated'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Asset with no 'file:checksum' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['file:checksum'];

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/assets/example' && error.message === "must have required property 'file:checksum'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example with an incorrect 'created' asset field type should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['assets']['example']['created'] = 1234;

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/assets/example/created' && error.message === 'must be string',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
