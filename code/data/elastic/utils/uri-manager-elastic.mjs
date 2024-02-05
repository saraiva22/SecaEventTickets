import { put } from "./fetch-wrapper.mjs";

// Constants
const PORT = 9200;
const URI_PREFIX = `http://localhost:${PORT}/`;

export default async function (index) {
  // Create the index unconditionally. If the index already exists, nothing happiness
  await put(`${URI_PREFIX}${index}`);

  return {
    searchDocs: () => `${URI_PREFIX}${index}/_search`,
    getDoc: (id) => `${URI_PREFIX}${index}/_doc/${id}`,
    createDoc: () => `${URI_PREFIX}${index}/_doc/?refresh=wait_for`,
    updateDoc: (id) => `${URI_PREFIX}${index}/_doc/${id}?refresh=wait_for`,
    deleteDoc: (id) => `${URI_PREFIX}${index}/_doc/${id}?refresh=wait_for`,
  };
}
