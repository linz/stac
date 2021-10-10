import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const exampleItemPath = join(__dirname, '..', 'examples/item.json');

o.spec('Template item', () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('Example should pass validation', async () => {
    // given
    const templateItemExample = JSON.parse(await fs.readFile(exampleItemPath));

    // when
    let valid = validate(templateItemExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Example without mandatory 'template:new_field' property should fail validation", async () => {
    // given
    const templateItemExample = JSON.parse(await fs.readFile(exampleItemPath));
    delete templateItemExample.properties['template:new_field'];
    // when
    let valid = validate(templateItemExample);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some((error) => error.message === "should have required property '['template:new_field']'"),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
