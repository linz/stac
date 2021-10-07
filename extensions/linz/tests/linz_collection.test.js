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

  o("Collection with unsupported 'linz:*' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    const parameterName = 'linz:unknown';
    collection[parameterName] = 1;

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.params.additionalProperty === parameterName &&
          error.message === 'should NOT have additional properties',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Collection with unsupported 'quality:*' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    const parameterName = 'quality:unknown';
    collection[parameterName] = 1;

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) =>
          error.params.additionalProperty === parameterName &&
          error.message === 'should NOT have additional properties',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Collection with invalid 'proj:epsg' value should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    collection['assets']['example']['proj:epsg'] = 'string';

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.dataPath === ".assets['example']['proj:epsg']" && error.message === 'should be integer,null',
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Collection without 'linz:created' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:created'];

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '['linz:created']'")).equals(
      true,
    )(JSON.stringify(validate.errors));
  });

  o("Collection without 'linz:lifecycle' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:lifecycle'];

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '['linz:lifecycle']'")).equals(
      true,
    )(JSON.stringify(validate.errors));
  });

  o("Collection without 'linz:providers' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:providers'];

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '['linz:providers']'")).equals(
      true,
    )(JSON.stringify(validate.errors));
  });

  o("Collection without 'linz:security_classification' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:security_classification'];

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(
      validate.errors.some(
        (error) => error.message === "should have required property '['linz:security_classification']'",
      ),
    ).equals(true)(JSON.stringify(validate.errors));
  });

  o("Collection without 'linz:updated' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:updated'];

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '['linz:updated']'")).equals(
      true,
    )(JSON.stringify(validate.errors));
  });

  o("Collection without 'linz:providers' 'name' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection['linz:providers'][0].name;

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property 'name'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  o("Collection without 'providers' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection.providers;

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '.providers'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  o('Collection without required provider roles should fail validation', async () => {
    // given
    for (const role of ['producer', 'licensor']) {
      const collection = JSON.parse(await fs.readFile(examplePath));
      collection.providers = collection.providers.filter((provider) => !role in provider.roles);

      // when
      let valid = validate(collection);

      // then
      o(valid).equals(false);
      o(
        validate.errors.some(
          (error) => error.dataPath === '.providers' && error.message === 'should contain a valid item',
        ),
      ).equals(true)(JSON.stringify(validate.errors));
    }
  });

  o("Collection without 'title' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection.title;

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '.title'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });

  o("Collection without 'version' property should fail validation", async () => {
    // given
    const collection = JSON.parse(await fs.readFile(examplePath));
    delete collection.version;

    // when
    let valid = validate(collection);

    // then
    o(valid).equals(false);
    o(validate.errors.some((error) => error.message === "should have required property '.version'")).equals(true)(
      JSON.stringify(validate.errors),
    );
  });
});
