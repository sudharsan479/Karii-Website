import { defineType, defineField } from "sanity";

export default defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
    }),
    defineField({
      name: "storyNarrative",
      title: "Story Narrative (Intro)",
      type: "text",
    }),
    defineField({
      name: "storyNarrativeExtended",
      title: "Story Narrative (Extended)",
      type: "text",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
    }),
    defineField({
      name: "emailAddress",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "string",
    }),
  ],
});
