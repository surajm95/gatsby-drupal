import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import { GatsbyImage,getImage } from "gatsby-plugin-image";
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = ({ data }) => {
  const block = data.blockContentBannerBlock;
  //  console.log(data);
  const image = getImage(data.blockContentBannerBlock.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp)

  // const Bannerlink = data.blockContentBannerBlock.field_content_link
  return (
    <Layout>
      <section>
        <div>
          <GatsbyImage image={image}  alt= {block.field_title}/>
          <div className='container'>  
            <div className='p-4'>
              <h2> {block.field_title} </h2>
              <h4> {block.field_summary} </h4>
              <div>
                <button type="button" className="btn btn-danger"><Link to={data.nodeRecipe.path.alias}>
                  {data.blockContentBannerBlock.field_content_link.title}
                </Link></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home;

export const query = graphql`
query Bannerquery {
  blockContentBannerBlock {
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
    field_title
    field_summary
    field_content_link {
      title
      
    }
  }
  nodeRecipe(path: {alias: {eq: "/recipes/super-easy-vegetarian-pasta-bake"}}) {
    path {
      alias
    }
  }
}`;
