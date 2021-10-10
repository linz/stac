import o from 'ospec';
import { AjvOptions, defaultTimeout } from '../../validation.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import Ajv from 'ajv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('LINZ item', () => {
  o.specTimeout(defaultTimeout);
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('Example should pass validation', async () => {
    // given
    const linzItemExample = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(linzItemExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Example without 'linz:geospatial_type' property should fail validation", async () => {
    // given
    const linzItemExample = JSON.parse(await fs.readFile(examplePath));
    delete linzItemExample['linz:geospatial_type'];

    // when
    const valid = validate(linzItemExample);

    // then
    o(valid).equals(false);
    o(validate.errors[0].message).equals("should have required property '['linz:geospatial_type']'");
  });

  o("Example with invalid 'linz:geospatial_type' value should fail validation", async () => {
    // given
    const linzItemExample = JSON.parse(await fs.readFile(examplePath));
    linzItemExample['linz:geospatial_type'] = 'incorrect_example';

    // when
    const valid = validate(linzItemExample);

    // then
    o(valid).equals(false);
    o(validate.errors[0].message).equals('should be equal to one of the allowed values');
  });
});
