import axios from 'axios';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));
import iriFormats from 'stac-node-validator/iri.js';
import { fastFormats } from 'ajv-formats/dist/formats.js';

const Schemas = new Map();
export function loadSchema(uri) {
  let existing = Schemas.get(uri);
  if (existing == null) {
    existing = loadSchemaFromUri(uri);
    Schemas.set(uri, existing);
  }
  return existing;
}

/**
 * function passed in to Ajv instance which allows us to load schemas from a url at run time.
 */
export async function loadSchemaFromUri(uri) {
  try {
    if (uri.startsWith('https://stac.linz.govt.nz/_STAC_VERSION_/')) {
      const schemaPath = uri.slice('https://stac.linz.govt.nz/_STAC_VERSION_/'.length);
      return JSON.parse(await fs.readFile(join(__dirname, 'extensions', schemaPath)));
    }

    let response = await axios.get(uri);
    return response.data;
  } catch (error) {
    throw new Error(`-- Schema at '${uri}' not found. Please ensure all entries in 'stac_extensions' are valid.`);
  }
}

export const AjvOptions = { loadSchema, formats: Object.assign(fastFormats, iriFormats) };
export const DefaultTimeoutMillis = 60_000;
