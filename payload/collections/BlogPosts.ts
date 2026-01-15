import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'status', 'publishedDate'],
  },
  access: {
    read: ({ req }) => {
      // Published posts are public, drafts only for authenticated users
      if (req.user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Post Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Excerpt',
      admin: {
        description: 'Brief summary (1-2 sentences) for previews and SEO',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Post Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'News', value: 'news' },
        { label: 'Press Release', value: 'press-release' },
        { label: 'Events', value: 'events' },
        { label: 'Training', value: 'training' },
        { label: 'Success Stories', value: 'success-stories' },
        { label: 'Announcements', value: 'announcements' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Author',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Related Projects',
    },
  ],
}
