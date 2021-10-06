import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

o.spec('linz-collection', () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    o.timeout(5000);
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('linz-collection-validates-successfully', async () => {
    // given
    const linzCollectionExample = JSON.parse(await fs.readFile(examplePath));

    // when
    const valid = validate(linzCollectionExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });
});
