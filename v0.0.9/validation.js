import axios from 'axios';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import iriFormats from 'stac-node-validator/iri.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    if (uri.startsWith('https://linz.github.io/stac/v0.0.9/')) {
      const schemaPath = uri.slice('https://linz.github.io/stac/v0.0.9/'.length);
      return JSON.parse(await fs.readFile(join(__dirname, schemaPath)));
    }

    let response = await axios.get(uri);
    return response.data;
  } catch (error) {
    throw new Error(`-- Schema at '${uri}' not found. Please ensure all entries in 'stac_extensions' are valid.`);
  }
}

export const AjvOptions = { loadSchema, formats: Object.assign(iriFormats) };
export const DefaultTimeoutMillis = 60_000;
