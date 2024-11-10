import { defineArrayMember, defineField, defineType } from "sanity";

/* eslint-disable import/no-anonymous-default-export */
export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
      options: {
        hotspot: true,
      },
    },
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "string",
    }),
  ],
});
