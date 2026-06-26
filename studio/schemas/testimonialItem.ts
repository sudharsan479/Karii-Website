import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonialItem",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1 to 5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "occasion",
      title: "Occasion / Project Type",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
  ],
});
