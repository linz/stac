import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/collection.json');

o.spec('Quality collection', () => {
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

  o("Example with an incorrect 'quality:description' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['quality:description'] = 1234;

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === "['quality:description']" && error.message === 'should be string',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o(
    "Example which contains a value for the 'quality:horizontal_accuracy_type' field which isn't one of the enumerated values should fail validation",
    async () => {
      // given
      const example = JSON.parse(await fs.readFile(examplePath));
      example['quality:horizontal_accuracy_type'] = 'Good';

      // when
      let valid = validate(example);

      // then
      o(valid).equals(false);
      o(
        validate.errors.some(
          (error) =>
            error.dataPath === "['quality:horizontal_accuracy_type']" &&
            error.message === 'should be equal to one of the allowed values',
        ),
      ).equals(true)(JSON.stringify(validate.errors));
    },
  );

  o(
    "Example which contains a value for the 'quality:vertical_accuracy_type' field which isn't one of the enumerated values should fail validation",
    async () => {
      // given
      const example = JSON.parse(await fs.readFile(examplePath));
      example['quality:vertical_accuracy_type'] = 'Good';

      // when
      let valid = validate(example);

      // then
      o(valid).equals(false);
      o(
        validate.errors.some(
          (error) =>
            error.dataPath === "['quality:vertical_accuracy_type']" &&
            error.message === 'should be equal to one of the allowed values',
        ),
      ).equals(true)(JSON.stringify(validate.errors));
    },
  );
});
