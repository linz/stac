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

describe('LINZ collection', { timeout: DefaultTimeoutMillis }, () => {
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

  it("Example with unsupported 'linz:*' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    const parameterName = 'linz:unknown';
    example[parameterName] = 1;

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.params.additionalProperty === parameterName && error.message === 'must NOT have additional properties',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Asset with no 'created' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['created'];

    // when
    const valid = validate(example);

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
    const valid = validate(example);

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

  it("Example without 'linz:lifecycle' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:lifecycle'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'linz:lifecycle'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without 'linz:security_classification' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:security_classification'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '' && error.message === "must have required property 'linz:security_classification'",
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Example without 'providers' property should fail validation", async () => {
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
    for (const role of ['producer', 'licensor']) {
      const example = JSON.parse(await fs.readFile(examplePath));
      example.providers = example.providers.filter((provider) => (!role) in provider.roles);

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

  it("Example without 'title' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.title;

    // when
    const valid = validate(example);

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

  it("Collection with no 'linz:geospatial_category' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:geospatial_category'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors));
  });

  it("Collection with incorrect 'linz:geospatial_category' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:geospatial_category'] = 'not-a-category';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/linz:geospatial_category' &&
          error.message === 'must be equal to one of the allowed values',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Collection with incorrect 'linz:region' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:region'] = '';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/linz:region' && error.message === 'must be equal to one of the allowed values',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Collection with no 'linz:region' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:region'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true);
  });

  it("Collection with invalid 'linz:geographic_description' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:geographic_description'] = '';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/linz:geographic_description' &&
          error.message === 'must NOT have fewer than 1 characters',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Collection with no 'linz:geographic_description' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:geographic_description'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true);
  });

  it("Collection with invalid 'linz:event_name' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:event_name'] = '';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/linz:event_name' && error.message === 'must NOT have fewer than 1 characters',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Collection with no 'linz:event_name' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:event_name'];

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true);
  });

  it("Collection with invalid 'linz:historic_survey_number' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:historic_survey_number'] = '';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) =>
          error.instancePath === '/linz:historic_survey_number' &&
          error.message === 'must NOT have fewer than 1 characters',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Collection with no 'linz:historic_survey_number' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors));
  });

  it("Collection with invalid 'linz:slug' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:slug'] = '';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/linz:slug' && error.message === 'must NOT have fewer than 1 characters',
      ),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Collection with 'chatham-islands' region should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:region'] = 'chatham-islands';

    // when
    const valid = validate(example);

    // then
    assert.equal(valid, true, JSON.stringify(validate.errors));
  });
});
