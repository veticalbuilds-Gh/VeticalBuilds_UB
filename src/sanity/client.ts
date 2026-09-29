import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "2uh77idu",
  dataset: "production",
  apiVersion: "2024-03-01",
  useCdn: false,
});
