export default {
  name: 'newsPost',
  title: 'News Post',
  type: 'document',
  fields: [
    {
      name: 'sourceRssUrl',
      title: 'Source RSS URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
      description: 'Original RSS feed URL - used for deduplication to prevent duplicate articles'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { 
        source: 'englishTitle',
        maxLength: 96 
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'englishTitle',
      title: 'English Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'englishExcerpt',
      title: 'English Excerpt',
      type: 'text',
      rows: 2
    },
    {
      name: 'englishBody',
      title: 'English Body',
      type: 'text',
      rows: 10
    },
    {
      name: 'englishMetaDescription',
      title: 'English Meta Description',
      type: 'string'
    },
    {
      name: 'tagalogTitle',
      title: 'Tagalog Title',
      type: 'string'
    },
    {
      name: 'tagalogExcerpt',
      title: 'Tagalog Excerpt',
      type: 'text',
      rows: 2
    },
    {
      name: 'tagalogBody',
      title: 'Tagalog Body',
      type: 'text',
      rows: 10
    },
    {
      name: 'cebuanoTitle',
      title: 'Cebuano Title',
      type: 'string'
    },
    {
      name: 'cebuanoExcerpt',
      title: 'Cebuano Excerpt',
      type: 'text',
      rows: 2
    },
    {
      name: 'cebuanoBody',
      title: 'Cebuano Body',
      type: 'text',
      rows: 10
    },
    {
      name: 'ilocanoTitle',
      title: 'Ilocano Title',
      type: 'string'
    },
    {
      name: 'ilocanoExcerpt',
      title: 'Ilocano Excerpt',
      type: 'text',
      rows: 2
    },
    {
      name: 'ilocanoBody',
      title: 'Ilocano Body',
      type: 'text',
      rows: 10
    },
    {
      name: 'featuredImageUrl',
      title: 'Featured Image URL',
      type: 'url',
      description: 'Cloudinary image URL from n8n workflow'
    },
    {
      name: 'featuredImageAlt',
      title: 'Featured Image Alt Text',
      type: 'string'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Reference to author document'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
      description: 'Select article category'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'datePublished',
      title: 'Date Published',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Auto-calculated by AI'
    },
    {
      name: 'workflowSource',
      title: 'Workflow Source',
      type: 'string',
      options: {
        list: [
          { title: 'Global Crypto News', value: 'global' },
          { title: 'Philippines Crypto News', value: 'philippines' }
        ]
      },
      description: 'Which n8n workflow created this article'
    },
    {
      name: 'workflowMode',
      title: 'Workflow Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Requires Approval', value: 'requires_approval' },
          { title: 'Auto Publish', value: 'auto_publish' }
        ]
      },
      description: 'Day shift (approval) vs Night shift (auto)'
    },
    {
      name: 'priorityScore',
      title: 'Priority Score',
      type: 'number',
      description: 'AI-calculated relevance score (higher = more important)'
    }
  ],
  preview: {
    select: {
      title: 'englishTitle',
      subtitle: 'category',
      description: 'workflowSource'
    },
    prepare(selection: any) {
      const { title, subtitle, description } = selection
      return {
        title: title,
        subtitle: `${subtitle || 'Uncategorized'} • ${description || 'unknown source'}`
      }
    }
  }
}