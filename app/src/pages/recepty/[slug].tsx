import React from 'react';
import BlogArticle from 'views/BlogArticle';

export const getServerSideProps = async ({ params }): Promise<{props: {slug: string}}> => {
  console.debug(params);

  return { props: {
    slug: params.slug
  }};
};

const BlogArticlePage = (props: { slug: string }): JSX.Element => {

  console.log(props.slug);

  return <BlogArticle />;
};

export default BlogArticlePage;
