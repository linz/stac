import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('Scanning Extension Item', () => {
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

  o("Example with an incorrect 'scan:is_original' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.properties['scan:is_original'] = 'notboolean';

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/properties/scan:is_original' && error.message === 'must be boolean',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Example with an incorrect 'scan:scanned' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example.properties['scan:scanned'] = '2019/DQ';

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/properties/scan:scanned' && error.message === 'must match pattern "(\\+00:00|Z)$"',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
