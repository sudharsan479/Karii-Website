import { defineType, defineField } from "sanity";

export default defineType({
  name: "wikiItem",
  title: "Wiki / Blog Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary (Teaser text)",
      type: "text",
    }),
    defineField({
      name: "content",
      title: "Content (Markdown or Rich Text string)",
      type: "text",
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
    }),
    defineField({
      name: "helpfulYes",
      title: "Helpful Upvotes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "helpfulNo",
      title: "Helpful Downvotes",
      type: "number",
      initialValue: 0,
    }),
  ],
});
