import o from 'ospec';
import { ajv } from '../../validation.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

o.spec('linz-collection', () => {
  let data;

  o.before(async () => {
    data = JSON.parse(await fs.readFile(schemaPath));
  });

  o('linz-collection-validates-successfully', async () => {
    // given
    const linz_colleciton_example = JSON.parse(await fs.readFile(examplePath));

    ajv.compileAsync(data).then(function (validate) {
      const valid = validate(linz_colleciton_example);
      o(valid).equals(true);
    });
  });
});
