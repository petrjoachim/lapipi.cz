import { ArticleProps } from 'types/Recipe';
import { makePhotoComponent } from './photoComponent';

export function makeArticleProps(article: any): ArticleProps {
  return {
    heading: article.heading,
    description: article.desccription ?? '',
    content: article.content,
    slug: article.slug,

    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    publishedAt: article.publishedAt,

    author: {
      name: article.author.data.attributes.name,
      photo: makePhotoComponent(
        article.author.data.attributes.photo.data.attributes,
      ),
    },

    recipes: article.recipes.data.map((recipe) => ({
      name: recipe.attributes.name,
      time: recipe.attributes.time,
      slug: recipe.attributes.slug,

      createdAt: recipe.attributes.createdAt,
      updatedAt: recipe.attributes.updatedAt,
      // publishedAt: recipe.attributes.publishedAt,

      instructions: recipe.attributes.instructions.map((i) => ({
        step: i.step,
      })),
      ingredients: recipe.attributes.ingredients.map((i) => ({
        amount: i.amount,
        unit: i.unit,
        name: i.name,
      })),
      photos: recipe.attributes.photos.data.map((photo) =>
        makePhotoComponent(photo.attributes),
      ),
    })),
    photos: article.photos.data.map((photo) =>
      makePhotoComponent(photo.attributes),
    ),
    hero: makePhotoComponent(article.hero.data.attributes),
  };
}
