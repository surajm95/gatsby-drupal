import { graphql } from 'gatsby';
import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Recipes = ({ data }) => {
    //this is banner content and iname 
    const recipe_banner = data.recipeBlock;
    const recipe_banner_image = getImage(data.recipeBlock.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp)

  //this is recipes content that map 
  const recipe = data.allNodeRecipe.nodes;
  return (
    <Layout>
    <div>
          <GatsbyImage image={recipe_banner_image}  alt= {recipe_banner.field_title}/>
          <div>
            <h2> {recipe_banner.field_title} </h2>
            <h4> {recipe_banner.field_summary} </h4>
            <div>
              <button><Link to={data.nodeRecipe.path.alias}>
                {data.recipeBlock.field_content_link.title}
              </Link></button>
            </div>

          </div>
        </div>
      <h1>Recipes</h1>
      <div>
        {recipe.map(recipe => (
          <div key={recipe.id}>
          <div> <h3>{recipe.title} </h3></div>
          <div> <strong>Difficulty : </strong> {recipe.field_difficulty}  </div>
           
            <GatsbyImage image={getImage(recipe.relationships.field_media_image.relationships.field_media_image.localFile)} alt={recipe.title} />
            <div>
              <button> <Link to={recipe.path.alias} key={recipe.id}> View Recipe </Link> </button>
            </div>
          </div>

        ))}
      </div>
    </Layout>
  );
}

export default Recipes

export const query = graphql`
        query RecipesData {
          allNodeRecipe {
                    nodes {
                      title
                      id
                      field_difficulty
                      path {
                        alias
                      }
                      relationships {
                        field_media_image {
                          relationships {
                            field_media_image {
                              localFile {
                                childImageSharp {
                                  gatsbyImageData(
                                     width: 334,
                                     height: 255,
                                  )
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                 recipeBlock: blockContentBannerBlock(id: {eq: "f06b7cd0-b70a-52ce-9325-e3765a4df599"}) {
                    field_title
                    field_summary
                    field_content_link {
                      title
                    }
                    relationships {
                      field_media_image {
                        relationships {
                          field_media_image {
                            localFile {
                              childImageSharp {
                                gatsbyImageData
                  
                               
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  nodeRecipe(path: {alias: {eq: "/recipes/vegan-chocolate-and-nut-brownies"}}) {
                    path {
                      alias
                    }
                  }
         } `