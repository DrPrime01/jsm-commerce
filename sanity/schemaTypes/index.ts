import { type SchemaTypeDefinition } from "sanity";

import { bannerType } from "./bannerType";
import { productType } from "./productType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerType, productType],
};
