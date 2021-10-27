import o from 'ospec';
import Ajv from 'ajv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { AjvOptions, DefaultTimeoutMillis } from '../../validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', 'schema.json');
const examplePath = join(__dirname, '..', 'examples/item.json');

o.spec('historical-imagery item', () => {
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

  //   o("Example without the mandatory 'aerial-photo:run' field should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     delete example.properties['aerial-photo:run'];

  //     // when
  //     let valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(
  //       validate.errors.some(
  //         (error) =>
  //           error.dataPath === '.properties' && error.message === "should have required property '['aerial-photo:run']'",
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });

  o("Item with no 'eo:bands' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['eo:bands'];
    // when
    let valid = validate(example);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === '.properties' && error.message === "should have required property '['eo:bands']'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  //   o("Example without mandatory 'proj:epsg' property should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     delete example.properties['proj:epsg'];
  //     // when
  //     const valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(validate.errors.some((error) => error.message === "should have required property '['proj:epsg']'")).equals(true)(
  //       JSON.stringify(validate.errors),
  //     );
  //   });

  o("Example without mandatory 'mission' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['mission'];
    // when
    const valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '.mission'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  o("Example without mandatory 'platform' property should fail validation", async () => {
    // given
    const example = JSON.parse(await fs.readFile(examplePath));
    delete example.properties['platform'];
    // when
    const valid = validate(example);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '.platform'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  //   o("Example without the mandatory 'aerial-photo:run' field should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     delete example.properties['aerial-photo:run'];

  //     // when
  //     let valid = validate(example);

  //     // then
  //     o(valid).equals(false);
  //     o(
  //       validate.errors.some(
  //         (error) =>
  //           error.dataPath === '.properties' && error.message === "should have required property '['aerial-photo:run']'",
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });

  //   o("Example with an incorrect 'aerial-photo:run' field should fail validation", async () => {
  //     // given
  //     const example = JSON.parse(await fs.readFile(examplePath));
  //     example.properties['aerial-photo:run'] = 1234;

  //     // when
  //     let valid = validate(example);

  //     // then
  //     o(valid).equals(false);

  //     console.log(o(validate.errors.some(error)));
  //     o(
  //       validate.errors.some(
  //         (error) => error.dataPath === ".properties['aerial-photo:run']" && error.message === 'should be string',
  //       ),
  //     ).equals(true)(JSON.stringify(validate.errors));
  //   });
});
