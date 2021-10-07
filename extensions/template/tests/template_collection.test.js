import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const exampleCollectionPath = join(__dirname, '..', 'examples/collection.json');

o.spec('template-collection', () => {
  o.specTimeout(20000);
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('template-collection-validates-successfully', async () => {
    // given
    const templateCollectionExample = JSON.parse(await fs.readFile(exampleCollectionPath));

    // when
    let valid = validate(templateCollectionExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o('template-collection-validation-fails', async () => {
    // given
    const templateCollectionExample = JSON.parse(await fs.readFile(exampleCollectionPath));
    delete templateCollectionExample['assets']['example']['template:xyz']['y'];

    // when
    let valid = validate(templateCollectionExample);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property 'y'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });
});
