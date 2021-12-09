import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('Historical Imagery Extension Item', () => {
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
    const valid = validate(example);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Example with an invalid 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'incorrect_example';

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.instancePath === '' && error.message === 'boolean schema is false')).equals(
      true,
    )(JSON.stringify(validate.errors));
  });

  o("Example with a Collection 'type' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    example['type'] = 'Collection';

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '' && error.message === "must have required property 'title'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Example without optional 'instruments' property should pass validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['instruments'];
    // when
    let valid = validate(example);

    // then
    o(valid).equals(true)(JSON.stringify(validate.errors, null, 2));
  });

  o("Example without mandatory 'mission' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['mission'];
    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/properties' && error.message === "must have required property 'mission'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Example without mandatory 'platform' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['platform'];
    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.instancePath === '/properties' && error.message === "must have required property 'platform'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Example without the mandatory 'eo:bands' field should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.assets['visual']['eo:bands'];

    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/assets/visual' && error.message === "must have required property 'eo:bands'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Example without mandatory 'processing:software' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['processing:software'];
    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.instancePath === '/properties' && error.message === "must have required property 'processing:software'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });
});
