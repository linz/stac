import o from 'ospec';
import { AjvOptions } from '../../validation.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import Ajv from 'ajv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('linz-item', () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    o.timeout(5000);
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('linz-item-validates-successfully', async () => {
    // given
    const linzItemExample = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(linzItemExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o('linz-item-validation-fails-missing-geospatial-type', async () => {
    // given
    const linzItemExample = JSON.parse(await fs.readFile(examplePath));
    delete linzItemExample['linz:geospatial_type'];

    // when
    const valid = validate(linzItemExample);

    // then
    o(valid).equals(false);
    o(validate.errors[0].message).equals("should have required property '['linz:geospatial_type']'");
  });

  o('linz-item-validation-fails-incorrect-geospatial-type', async () => {
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
