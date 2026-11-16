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

// Note that tests for summaries will be written once the rules are decided for mandatory summary data

describe('Historical Imagery Extension Collection', { timeout: DefaultTimeoutMillis }, () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  it("Example with an invalid 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'incorrect_example';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some((error) => error.instancePath === '' && error.message === 'boolean schema is false'),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example with an Item 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'Feature';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'properties'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it('Example should pass validation', async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
  });

  it("Example without 'title' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.title;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some((error) => error.message === "must have required property 'title'"),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without 'providers' should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.providers;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some((error) => error.message === "must have required property 'providers'"),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it('Collection without required provider roles should fail validation', async () => {
    // given
    const requiredProviderRoles = ['producer', 'licensor', 'processor', 'host'];
    for (const role of requiredProviderRoles) {
      const example = JSON.parse(await fs.readFile(examplePath));
      example.providers = requiredProviderRoles.filter((entry) => entry !== role);

      // when
      const valid = validate(example);

      // then
      assert.equal(valid, false);
      assert.equal(
        validate.errors.some(
          (error) => error.instancePath === '/providers' && error.message === 'must contain at least 1 valid item(s)',
        ),
        true,
        JSON.stringify(validate.errors),
      );
    }
  });

  it("Summaries with no 'platform' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries.platform;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'platform'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with empty 'platform' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries.platform = [];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/summaries/platform' && error.message === 'must NOT have fewer than 1 items',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with no 'mission' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries.mission;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'mission'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with empty 'mission' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries.mission = [];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/summaries/mission' && error.message === 'must NOT have fewer than 1 items',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with empty 'instruments' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries.instruments = [];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/instruments' && error.message === 'must NOT have fewer than 1 items',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with no 'proj:epsg' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['proj:epsg'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'proj:epsg'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Summaries with null value in 'proj:epsg' should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['proj:epsg'] = [null];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true);
  });

  it("Example with no 'summaries' should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'summaries'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });
});
