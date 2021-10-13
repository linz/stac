import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

o.spec('Template collection', () => {
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

  o("Example without mandatory 'y' field in the 'template:xyz object should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example['assets']['example']['template:xyz']['y'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property 'y'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });
});
