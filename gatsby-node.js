const path = require("path")
const BlogPost = path.resolve(`./src/templates/blogPost.js`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWpPost(sort: { fields: [date] }) {
        nodes {
          title
          slug
        }
      }
    }
  `).then(result => {
    result.data.allWpPost.nodes.forEach(node => {
      console.log(node)
      createPage({
        path: node.slug,
        component: BlogPost,
        context: {
          slug: node.slug,
        },
      })
    })
  })
}
