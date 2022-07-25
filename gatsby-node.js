const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
     const { createPage } = actions
     const ArticleTemplate = path.resolve(`./src/templates/article.js`)
     const RecipeTemplate = path.resolve(`./src/templates/recipe.js`)
     const TegsTemplate = path.resolve(`./src/templates/tegsPage.js`)

     const article = await graphql(`
          query Article{
               allNodeArticle {
                    nodes {
                       id
                       title
                       path {
                            alias
                         }
                    }
              }
          }
          
     `).then(result => {
          result.data.allNodeArticle.nodes.forEach(articleData => {
               createPage({
                    path: `${articleData.path.alias}`,
                    component: ArticleTemplate,
                    ownerNodeId: articleData.id,
                    context: {
                         articleId: articleData.id,
                    },
               });
          });
     })
     

     const recipe = graphql(`
     query recipe{
          allNodeRecipe {
          nodes {
                 title
                 id
                path {
                     alias
                    }
               }
          }
     }
  `).then(result => {
     result.data.allNodeRecipe.nodes.forEach(recipeData => {
          createPage({
               path: `${recipeData.path.alias}`,
               component: RecipeTemplate,
               ownerNodeId: recipeData.id,
               context: {
                    recipeId: recipeData.id,
               },
          });
     });
  })

  const tegsPage = graphql(`
  query tegsPage {
     allTaxonomyTermTags {
          nodes {
               drupal_internal__tid
            path {
              alias
            }
          }
        }
   }
`).then(result => {
  result.data.allTaxonomyTermTags.nodes.forEach(tegsPageData => {
       createPage({
            path: `${tegsPageData.path.alias}`,
            component: TegsTemplate,
            ownerNodeId: tegsPageData.drupal_internal__tid,
            context: {
                 tegsPageId: tegsPageData.drupal_internal__tid,
            },
       });
  });
})

  return Promise.all([article, recipe,tegsPage])

}