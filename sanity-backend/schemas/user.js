import {defineField, defineType} from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField(
      {
        name: 'userName',
        title: 'User name',
        type: 'String',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'String',
      },
    ),
  ],
})

// export default {
//   name: 'user',
//   title: 'User',
//   type: 'document',
//   fields: [
//     {
//       name: 'userName',
//       title: 'User name',
//       type: 'String',
//     },
//     {
//       name: 'image',
//       title: 'Image',
//       type: 'String',
//     },
//   ],
// }
