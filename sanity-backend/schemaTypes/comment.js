import {defineField, defineType} from 'sanity'

const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
  ],
})

export default comment
// export default {
//   name: 'comment',
//   title: 'Comment',
//   type: 'document',
//   fields: [
//     {
//       name: 'postedBy',
//       title: 'Posted By',
//       type: 'postedBy',
//     },
//     {
//       name: 'comment',
//       title: 'Comment',
//       type: 'String',
//     },
//   ],
// }
