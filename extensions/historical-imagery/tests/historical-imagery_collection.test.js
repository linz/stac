import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

// Note that tests for summaries will be written once the rules are decided for mandatory summary data

o.spec('Historical Imagery Extension Collection', () => {
  o.specTimeout(DefaultTimeoutMillis);
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o("Example with an invalid 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'incorrect_example';

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.instancePath === '' && error.message === 'boolean schema is false')).equals(
      true,
    )(JSON.stringify(validate.errors));
  });

  o("Example with an Item 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'Feature';

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'properties'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o('Example should pass validation', async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(example);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Example without 'title' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.title;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "must have required property 'title'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  o("Example with missing 'processing:software' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['processing:software'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'processing:software'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Example without 'providers' should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.providers;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "must have required property 'providers'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  o('Collection without required provider roles should fail validation', async () => {
    // given
    for (const role of ['producer', 'licensor', 'processor', 'host']) {
      const example = JSON.parse(await fs.readFile(examplePath));
      example.providers = example.providers.filter((provider) => !role in provider.roles);

      // when
      let valid = validate(example);

      // then
      o(valid).equals(false);
      o(
        validate.errors.some(
          (error) => error.instancePath === '/providers' && error.message === 'must contain at least 1 valid item(s)',
        ),
      ).equals(true)(JSON.stringify(validate.errors));
    }
  });

  o("Summaries with no 'platform' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries.platform;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'platform'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'platform' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries.platform = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/summaries/platform' && error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with no 'mission' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries.mission;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'mission'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'mission' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries.mission = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/summaries/mission' && error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with empty 'instruments' list should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries.instruments = [];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/summaries/instruments' && error.message === 'must NOT have fewer than 1 items',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with no 'proj:epsg' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries['proj:epsg'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/summaries' && error.message === "must have required property 'proj:epsg'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Summaries with null value in 'proj:epsg' should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.summaries['proj:epsg'] = [null];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(true);
  });

  o("Example with no 'summaries' should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.summaries;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'summaries'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
