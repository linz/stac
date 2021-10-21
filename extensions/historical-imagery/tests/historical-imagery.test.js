import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('historical-imagery', () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('historical-imagery-validates-successfully', async () => {
    // given
    const histImageryItemExample = JSON.parse(await fs.readFile(examplePath));

    // when
    let valid = validate(histImageryItemExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });
});
