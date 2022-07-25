import React from "react";
import PropTypes from 'prop-types';
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { Link } from "gatsby";
// import Img from 'gatsby-image';
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Recipe = ({ data }) => {
  const post = data.nodeRecipe;
  const image = getImage(post.relationships.field_media_image.relationships.field_media_image.localFile)
  //  post.relationships.field_media_image.relationships.field_media_image.localFile.childImageSharp;
  return (
    <Layout>
      <div>

        <h1>{post.title}</h1>
        <p>
          <strong>Category:</strong> {post.relationships.field_recipe_category.map((category) => (category.name))}
        </p>
        <p>
          <strong>Tags:</strong> {post.relationships.field_tags.map((tags) => (
            <Link to = {tags.path.alias}> {tags.name} </Link>
          ))}
        </p>
        <p> {post.field_summary.value} </p>
        <div>
          <div>
            <GatsbyImage image={image} alt={post.title} />
          </div>
          <div>
            <div>
              <strong>Preparation time:</strong>
            </div>
            <div>{post.field_preparation_time} minutes</div>
            <div>
              <strong>Cooking time:</strong>
            </div>
            <div>{post.field_cooking_time} minutes</div>
            <div>
              <strong>Number of servings:</strong>
            </div>
            <div>{post.field_number_of_servings} minutes</div>
            <div>
              <strong>Difficulty:</strong>
            </div>
            <div>{post.field_difficulty}</div>
          </div>
        </div>
        <div>
          <h2>What {`you'll`} need and how to make this dish</h2>
          <div>
            <div>
              <h3>Ingredients</h3>
              <ul>
                {post.field_ingredients &&
                  post.field_ingredients.map((ing, index) => (
                    <li key={index}>{ing}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h3>Recipe instruction</h3>
              <ul>
                {post.field_recipe_instruction.value &&
                  post.field_recipe_instruction.value
                    .replace(/<[^>]*>?/gm, '').split(`.`)
                    .map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );

}

Recipe.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
query Recipedata ($recipeId: String){
  nodeRecipe (id: {eq: $recipeId}){
              title
              field_difficulty
              field_cooking_time
              field_number_of_servings
              field_preparation_time
              field_ingredients
              field_recipe_instruction {
                value
              }
              field_summary {
                value
              }
              relationships {
                field_recipe_category {
                    name
                }
                field_tags {
                     name
                     path{
                        alias
                     }
                }
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

export default Recipe