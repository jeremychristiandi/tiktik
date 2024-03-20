import {defineField, defineType} from 'sanity'

const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'userName',
      title: 'User name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
  ],
})

export default user
