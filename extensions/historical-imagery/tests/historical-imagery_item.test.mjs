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

describe('Historical Imagery Extension Item', { timeout: DefaultTimeoutMillis }, () => {
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

  it("Example with an invalid 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'incorrect_example';

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some((error) => error.instancePath === '' && error.message === 'boolean schema is false'),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example with a Collection 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'Collection';

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'title'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without optional 'instruments' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['instruments'];
    // when
    let valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
  });

  it("Example without mandatory 'mission' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['mission'];
    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/properties' && error.message === "must have required property 'mission'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without mandatory 'platform' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['platform'];
    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/properties' && error.message === "must have required property 'platform'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without the mandatory 'eo:bands' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.assets['visual']['eo:bands'];

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/assets/visual' && error.message === "must have required property 'eo:bands'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
