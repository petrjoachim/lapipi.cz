import { makeArticleProps } from 'common/articleProps';
import React from 'react';
import { ArticleProps } from 'types/Recipe';
import BlogReachView from 'views/BlogReachView';
const qs = require('qs');

export const getServerSideProps = async ({
  params,
}): Promise<{ props: { articles: ArticleProps[] } }> => {
  const host = process.env.BACKEND_URL ?? 'http://localhost:1337';
  const query = qs.stringify(
    {
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
      props: { articles: [] },
    };
  }

  const articles = data.data;

  return {
    props: {
      articles: articles.map((article) => makeArticleProps(article.attributes)),
    },
  };
};

const BlogReachViewPage = (props: {
  articles: ArticleProps[];
}): JSX.Element => {
  return <BlogReachView articles={props.articles} />;
};

export default BlogReachViewPage;
