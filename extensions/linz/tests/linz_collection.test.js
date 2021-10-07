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
  o.specTimeout(20000);
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
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

  o("Collection without 'linz:providers' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:providers'];

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.length).equals(1);
    o(validate.errors[0].message).equals("should have required property 'linz:providers'");
  });

  o("Collection without 'linz:providers' 'name' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:providers'][0].name;

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.length).equals(1);
    o(validate.errors[0].message).equals("should have required property 'name'");
  });
});
