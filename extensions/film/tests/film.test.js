import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('film', () => {
  let validate;
  const ajv = new Ajv(AjvOptions);

  o.before(async () => {
    const data = JSON.parse(await fs.readFile(schemaPath));
    validate = await ajv.compileAsync(data);
  });

  o('film-validates-successfully', async () => {
    // given
    const filmItemExample = JSON.parse(await fs.readFile(examplePath));

    // when
    let valid = validate(filmItemExample);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Item with an incorrect 'film:id' field should fail validation", async () => {
    // given
    const filmItemExample = JSON.parse(await fs.readFile(examplePath));
    filmItemExample.properties['film:id'] = 1234;

    // when
    let valid = validate(filmItemExample);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === ".properties['film:id']" && error.message === 'should be string',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Item without a mandatory 'film:id' field should fail validation", async () => {
    // given
    const filmItemExample = JSON.parse(await fs.readFile(examplePath));
    delete filmItemExample.properties['film:id'];

    // when
    let valid = validate(filmItemExample);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === '.properties' && error.message === "should have required property '['film:id']'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Item with an incorrect 'film:negative_sequence' field should fail validation", async () => {
    // given
    const filmItemExample = JSON.parse(await fs.readFile(examplePath));
    filmItemExample.properties['film:negative_sequence'] = 'incorrect_example';

    // when
    let valid = validate(filmItemExample);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === ".properties['film:negative_sequence']" && error.message === 'should be integer',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Item without a mandatory 'film:negative_sequence' field should fail validation", async () => {
    // given
    const filmItemExample = JSON.parse(await fs.readFile(examplePath));
    delete filmItemExample.properties['film:negative_sequence'];

    // when
    let valid = validate(filmItemExample);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.dataPath === '.properties' &&
          error.message === "should have required property '['film:negative_sequence']'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
