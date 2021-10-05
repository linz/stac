import Ajv from 'ajv';
import axios from 'axios';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs, readdirSync, statSync } from 'fs';
import iriFormats from 'stac-node-validator/iri.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * function passed in to Ajv instance which allows us to load schemas from a url at run time.
 */
async function loadSchema(uri) {
  let json;
  try {
    let response = await axios.get(uri);
    json = response.data;
  } catch (error) {
    throw new Error(`-- Schema at '${uri}' not found. Please ensure all entries in 'stac_extensions' are valid.`);
  }
  return json;
}

/**
 * function which will preload the Ajv instance with schemas from each directory beneath the 'extensions' directory.
 */
async function populateSchemas(path) {
  let schemaList = readdirSync(path).filter(function (file) {
    return statSync(path + '/' + file).isDirectory();
  });

  for (let schema of schemaList) {
    try {
      let schemaJson = JSON.parse(await fs.readFile(join(path, './' + schema + '/schema.json')));
      ajv.addSchema(schemaJson, schemaJson.$id);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('File not found!');
      } else {
        throw err;
      }
    }
  }
}

export const ajv = new Ajv({ loadSchema: loadSchema, formats: Object.assign(iriFormats) });
populateSchemas(__dirname);
