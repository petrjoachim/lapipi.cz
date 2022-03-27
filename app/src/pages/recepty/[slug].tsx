import React from 'react';
import { ArticleProps } from 'types/Recipe';
import BlogArticle from 'views/BlogArticle';
import { makeArticleProps } from 'common/articleProps';
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
    props: makeArticleProps(article.attributes),
  };
};

const BlogArticlePage = (article: ArticleProps): JSX.Element => {
  console.log(article.slug);

  return <BlogArticle {...article} />;
};

export default BlogArticlePage;
