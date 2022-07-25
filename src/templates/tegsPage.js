import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { Link } from "gatsby"
// import Img from 'gatsby-image';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TegsPage = ({ data }) => {
  const tegsName = data.taxonomyTermTags
  const tegsArticle = data.taxonomyTermTags.relationships.node__article
  const tegsRecipe = data.taxonomyTermTags.relationships.node__recipe
  // console.log(tegsArticleName)

  return (
    <Layout>
      <div key={tegsName.name}>
        <h1 className="mt-5" style={{ textAlign: "center" }}>
          {tegsName.name}
        </h1>
      </div>
      {/* this div show teg name with reletive  recipes data  */}
       { tegsRecipe != null ? tegsRecipe.map(tegsRecipe => (
        <div key={tegsRecipe.id}>
          <h2> {tegsRecipe.title} </h2>
          <div>
            <strong> Difficulty :</strong> {tegsRecipe.field_difficulty}
            {/* <Link to={tegsRecipe.path.alias}>
              {tegsRecipe.field_difficulty}
            </Link> */}
          </div>
          <div>
            <GatsbyImage
              image={getImage(
                tegsRecipe.relationships.field_media_image.relationships
                  .field_media_image.localFile.childImageSharp
              )}
              alt={tegsRecipe.title}
            />
          </div>
          <div>
            <Link to={tegsRecipe.path.alias}> View Recipe </Link>
          </div>
        </div>
      )) : null}

      {/* this div show teg name with reletive  articles data  */}
      { tegsArticle != null ? tegsArticle.map(tegArticle => (
        <div key={tegArticle.id}>
          <h2> {tegArticle.title} </h2>
          <div>
            <GatsbyImage
              image={getImage(
                tegArticle.relationships.field_media_image.relationships
                  .field_media_image.localFile.childImageSharp
              )}
              alt={tegArticle.title}
            /> 
          </div>
          <div>
            <Link to={tegArticle.path.alias}> View Article </Link>
          </div>
        </div>
      )) : null }
    </Layout>
  )
}

export default TegsPage

TegsPage.propTypes = {
  data: PropTypes.object,
}

export const query = graphql`
  query MyQuery($tegsPageId: Int) {
    taxonomyTermTags(drupal_internal__tid: { eq: $tegsPageId }) {
      name
      relationships {
        node__article {
          title
          id
          path {
            alias
          }
          relationships {
            field_media_image {
              relationships {
                field_media_image {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 334, height: 255)
                    }
                  }
                }
              }
            }
          }
        }
        node__recipe {
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
                      gatsbyImageData(width: 334, height: 255)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
