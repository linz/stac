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
    let valid = validate(example);

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

  it("Example with unsupported 'quality:*' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    const parameterName = 'quality:unknown';
    example[parameterName] = 1;

    // when
    let valid = validate(example);

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

  it("Example with invalid 'proj:epsg' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['assets']['example']['proj:epsg'] = 'string';

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some(
        (error) => error.instancePath === '/assets/example/proj:epsg' && error.message === 'must be integer,null',
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

  it("Example without 'linz:lifecycle' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['linz:lifecycle'];

    // when
    let valid = validate(example);

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
    let valid = validate(example);

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
    let valid = validate(example);

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
      let valid = validate(example);

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

  it("Example without 'version' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.version;

    // when
    let valid = validate(example);

    // then
    assert.equal(valid, false);
    assert.equal(
      validate.errors.some((error) => error.message === "must have required property 'version'"),
      true,
      JSON.stringify(validate.errors),
    );
  });

  it("Collection with incorrect 'linz:region' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:region'] = '';

    // when
    let valid = validate(example);

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
    let valid = validate(example);

    // then
    assert.equal(valid, true);
  });

  it("Collection with invalid 'linz:geographic_description' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:geographic_description'] = '';

    // when
    let valid = validate(example);

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
    let valid = validate(example);

    // then
    assert.equal(valid, true);
  });

  it("Collection with invalid 'linz:event_name' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:event_name'] = '';

    // when
    let valid = validate(example);

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
    let valid = validate(example);

    // then
    assert.equal(valid, true);
  });

  it("Collection with invalid 'linz:slug' value should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['linz:slug'] = '';

    // when
    let valid = validate(example);

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
});
