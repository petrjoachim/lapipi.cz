import React from 'react';
import { ArticleProps } from 'types/Recipe';
import BlogReachView from 'views/BlogReachView';

export const getServerSideProps = async ({
  params,
}): Promise<{ props: { recipes: ArticleProps[] } }> => {
  console.debug(params);

  return { props: { recipes: [] } };
};

const BlogReachViewPage = (props: { recipes: ArticleProps[] }): JSX.Element => {
  return <BlogReachView />;
};

export default BlogReachViewPage;
