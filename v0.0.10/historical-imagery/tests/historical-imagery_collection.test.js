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

o.spec('historical-imagery collection', () => {
  o.specTimeout(DefaultTimeoutMillis);
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('Example should pass validation', async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));

    // when
    let valid = validate(example);

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
    o(validate.errors.some((error) => error.message === "should have required property '.title'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  o("Example without 'providers' should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.providers;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '.providers'")).equals(true)(
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
          (error) => error.dataPath === '.providers' && error.message === 'should contain a valid item',
        ),
      ).equals(true)(JSON.stringify(validate.errors));
    }
  });
});
