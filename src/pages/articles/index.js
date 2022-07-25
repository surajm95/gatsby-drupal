import React from 'react'
import Layout from '../../components/Layout'
import { Link, graphql } from 'gatsby'
// import Img from "gatsby-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Articles = ({ data }) => {
  // console.log(data)
  const articles = data.allNodeArticle.nodes
  // const { image } = data.allNodeArticle.nodes.relationships.field_media_image.relationships.field_media_image.localFile


  return (
    <Layout>

      <h1 style={{ textAlign: 'center' }}>Articles</h1>

      {articles.map(article => (
        <div className="row row-cols-1 row-cols-md-3 my-3 g-4" key={article.id}>
          <div className='col'>
            <div className="card">
              <div className="card-body" >
                <h3 className="card-title" key={article.id}>{article.title}</h3>
              </div>
              <div>
                <GatsbyImage className="card-img" image={getImage(article.relationships.field_media_image.relationships.field_media_image.localFile)} alt={article.title} />
              </div>
              <div>
                <Link className="btn btn-primary mt-2" to={article.path.alias} key={article.id}> View Article</Link>
              </div>
            </div>
          </div>
        </div>
      ))}

    </Layout>
  );
}

export default Articles

// export page query
export const query = graphql`
  query ProjectsPage {
    allNodeArticle {
      nodes {
        id
        title
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
  }
  `;
