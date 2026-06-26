import { defineType, defineField } from "sanity";

export default defineType({
  name: "serviceItem",
  title: "Service Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Service Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startingPrice",
      title: "Starting Price",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "imageUrl",
      title: "Service Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "features",
      title: "Features (List of features)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
