import { defineFunction } from "@aws-amplify/backend";

export const barcodeLookup = defineFunction({
  name: "barcode-lookup",
  entry: "./handler.ts"
});