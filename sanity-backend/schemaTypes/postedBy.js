import {defineType} from 'sanity'

const postedBy = defineType({
  name: 'postedBy',
  title: 'Posted By',
  type: 'reference',
  to: [{type: 'user'}],
})

export default postedBy

// const postedBy = defineType({
//   name: 'user',
//   title: 'User',
//   type: 'document',
//   to: [{type: 'user'}],
// })
