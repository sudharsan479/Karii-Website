import { defineType, defineField } from "sanity";

export default defineType({
  name: "shopItem",
  title: "Shop / Affiliate Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageUrl",
      title: "Product Image",
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
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),
    defineField({
      name: "affiliateLink",
      title: "Affiliate Link / Shop URL",
      type: "string",
    }),
    defineField({
      name: "isActive",
      title: "Is Active / Available",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
  ],
});
