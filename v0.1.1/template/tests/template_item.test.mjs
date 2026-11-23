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

describe('Template item', { timeout: DefaultTimeoutMillis }, () => {
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

  it("Example without mandatory 'template:new_field' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['template:new_field'];
    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some((error) => error.message === "must have required property 'template:new_field'"),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
