export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Red', value: 'red' },
          { title: 'Amber', value: 'amber' },
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
          { title: 'Teal', value: 'teal' },
          { title: 'Indigo', value: 'indigo' },
          { title: 'Purple', value: 'purple' },
          { title: 'Gray', value: 'gray' },
          { title: 'Yellow', value: 'yellow' }
        ]
      },
      initialValue: 'blue'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category appears (lower numbers first)',
      validation: (Rule: any) => Rule.required().min(0)
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      order: 'order'
    },
    prepare(selection: any) {
      const { title, subtitle, order } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle
      }
    }
  }
}