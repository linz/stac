import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const exampleCollectionPath = join(__dirname, '..', 'examples/collection.json');

o.spec('quality-collection', () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('Collection should pass validation', async () => {
    // given
    const qualityCollectionExample = JSON.parse(await fs.readFile(exampleCollectionPath));

    // when
    let valid = validate(qualityCollectionExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Collection without the mandatory 'quality:lineage' field should fail validation", async () => {
    // given
    const qualityCollectionExample = JSON.parse(await fs.readFile(exampleCollectionPath));
    delete qualityCollectionExample['quality:lineage'];

    // when
    let valid = validate(qualityCollectionExample);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === '' && error.message === "should have required property 'quality:lineage'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Collection with an incorrect 'quality:description' field should fail validation", async () => {
    // given
    const qualityCollectionExample = JSON.parse(await fs.readFile(exampleCollectionPath));
    qualityCollectionExample['quality:description'] = 1234;

    // when
    let valid = validate(qualityCollectionExample);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === "['quality:description']" && error.message === 'should be string',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o(
    "Collection which contains a value for the 'quality:horizontal_accuracy_type' field which isn't one of the enumerated values should fail validation",
    async () => {
      // given
      const qualityCollectionExample = JSON.parse(await fs.readFile(exampleCollectionPath));
      qualityCollectionExample['quality:horizontal_accuracy_type'] = 'Good';

      // when
      let valid = validate(qualityCollectionExample);

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
    "Collection which contains a value for the 'quality:vertical_accuracy_type' field which isn't one of the enumerated values should fail validation",
    async () => {
      // given
      const qualityCollectionExample = JSON.parse(await fs.readFile(exampleCollectionPath));
      qualityCollectionExample['quality:vertical_accuracy_type'] = 'Good';

      // when
      let valid = validate(qualityCollectionExample);

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
