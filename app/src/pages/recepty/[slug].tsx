import React from 'react';
import { ArticleProps } from 'types/Recipe';
import BlogArticle from 'views/BlogArticle';
import { parseISO, formatISO } from 'date-fns';
import { makePhotoComponent } from 'common/photoComponent';
const qs = require('qs');

export const getServerSideProps = async ({
  params,
}): Promise<{ props?: ArticleProps; notFound?: boolean }> => {
  const host = process.env.BACKEND_URL ?? 'http://localhost:1337';
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: params.slug,
        },
      },
      populate: [
        'hero',
        'photos',
        'author.photo',
        'recipes.photos',
        'recipes.ingredients',
        'recipes.instructions',
      ],
    },
    {
      encodeValuesOnly: true,
    },
  );

  const data = await (await fetch(`${host}/api/articles?${query}`)).json();

  if (!data.data?.length) {
    return {
      notFound: true,
    };
  }

  const article = data.data[0];

  return {
    props: {
      heading: article.attributes.heading,
      description: article.attributes.desccription ?? '',
      content: article.attributes.content,
      slug: article.attributes.slug,

      createdAt: article.attributes.createdAt,
      updatedAt: article.attributes.updatedAt,
      publishedAt: article.attributes.publishedAt,

      author: {
        name: article.attributes.author.data.attributes.name,
        photo: makePhotoComponent(
          article.attributes.author.data.attributes.photo.data.attributes,
        ),
      },

      recipes: article.attributes.recipes.data.map((recipe) => ({
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
      photos: article.attributes.photos.data.map((photo) =>
        makePhotoComponent(photo.attributes),
      ),
      hero: makePhotoComponent(article.attributes.hero.data.attributes),
    },
  };
};

const BlogArticlePage = (article: ArticleProps): JSX.Element => {
  console.log(article.slug);

  return <BlogArticle {...article} />;
};

export default BlogArticlePage;
