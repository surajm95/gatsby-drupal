import React from "react";
import PropTypes from 'prop-types';
import { graphql } from "gatsby";
import Layout from "../components/Layout";
// import Img from 'gatsby-image';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Article = ({data}) => {
     const post = data.nodeArticle;
     const image = getImage(post.relationships.field_media_image.relationships.field_media_image.localFile)
     return (
          <Layout>
               <div>
                    <h1>{post.title}</h1>
                    <GatsbyImage image={image}  alt= {post.title}  />
               </div>

               <div dangerouslySetInnerHTML={{ __html: post.body.processed }} />
               
          </Layout>
     );
    
}

Article.propTypes = {
     data: PropTypes.object,
};

export const query = graphql`
query Articledata($articleId: String) {
     nodeArticle (id: {eq: $articleId}){
       id
       title
       body {
         processed
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
   }`;

export default Article;