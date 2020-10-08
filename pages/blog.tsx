import { GetStaticProps } from 'next';
import React, { Fragment, useContext, useState } from 'react';
import Link from 'next/link';
import { getSortedPostsData } from 'lib/posts';
import { StaticBlog } from 'global';
import {
  Flex,
  Tag,
  Box,
  Heading,
  useColorMode,
  Link as StyledLink,
  Text,
  Divider,
  Input,
} from '@chakra-ui/core';
import colorMap from 'styles/colorMap';
import { addTwoMonthToPublishedDate, compareDateWithTodaysDate } from 'utils/dateOperations';
import { ColorModeContext } from '@contexts/CustomColorContext';
import { Article, ArticleTitle, Layout } from '@components/index';
import groupBy from 'lodash.groupby';
import Fuse from 'fuse.js';

type Props = {
  groupedBlogPosts: Record<number, StaticBlog[]>;
  blogPosts: StaticBlog[];
};

const options = {
  includeScore: true,
  keys: ['title', 'id', 'publishedAt'],
};

const Blog = ({ groupedBlogPosts, blogPosts }: Props) => {
  const colorModeObj = useContext(ColorModeContext);
  const { colorMode } = useColorMode();
  const [fusedBlog, setFusedBlog] = useState<StaticBlog[]>();

  const fuse = new Fuse(blogPosts, options);
  const handleChangeBlog = (value: string) => {
    const result = fuse.search(value);
    setFusedBlog(result);
    // eslint-disable-next-line no-console
    console.log(fusedBlog);
  };

  return (
    <Layout>
      <Flex justifyContent="center" alignItems="center" margin="1.5rem 0" flexDirection="column">
        <Heading
          as="h2"
          fontSize={['2rem', '2rem', '3rem', '3rem']}
          marginBottom="1rem"
          marginTop={['0.6rem', '0', '0', '0']}
          fontWeight="bold"
          color={colorModeObj.titleColor[colorMode]}
        >
          Blog
        </Heading>
        <Text textAlign="center" fontSize="1.3rem" color="#60656c" marginBottom="1.5rem">
          Articles, tutorials, snippets, musings, and everything else.
        </Text>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            handleChangeBlog(e.target.value);
          }}
          variant="outline"
          placeholder="Search..."
          maxWidth="400px"
        />
      </Flex>
      <Flex alignItems="flex-start" justifyContent="center" flexDirection="column">
        {Object.keys(groupedBlogPosts)
          .reverse()
          .map((blog, index) => (
            <Fragment key={index}>
              <Heading size="lg" marginTop={index !== 0 ? '4rem' : '0'}>
                {blog}
              </Heading>
              <Divider />
              {groupedBlogPosts[(blog as unknown) as number].map((article) => (
                <Article
                  key={`${blog}${article.id}`}
                  justifyContent="space-between"
                  alignItems="space-between"
                  color={colorMode === 'light' ? 'light' : 'dark'}
                >
                  <Link href={`/blog/${article.id}`}>
                    <StyledLink _hover={{ textDecoration: 'none' }}>
                      <ArticleTitle>
                        {compareDateWithTodaysDate(
                          addTwoMonthToPublishedDate(article.publishedAt),
                        ) ? (
                          <Tag
                            fontSize={['.7rem', '.7rem', '.8rem', '.7 rem']}
                            p=".5rem"
                            borderRadius=".3rem"
                            m={[
                              'auto .4rem auto 0',
                              'auto .4rem auto 0',
                              'auto .4rem auto 0',
                              '1rem 1rem 10px 0',
                            ]} //for responsive
                            height="15px"
                            backgroundColor="#d3f9d8"
                            fontWeight="700"
                            width={['2.7rem', '2.7rem', '', '']}
                            minW=""
                            color={colorModeObj.articleNewTagTextColor[colorMode]}
                            background={colorModeObj.articleNewTagBackgroundColor[colorMode]}
                          >
                            New!
                          </Tag>
                        ) : null}
                        <Box>
                          <Text color="#787f87" fontSize=".8rem" fontWeight="600">
                            {article.publishedAt}
                          </Text>
                          <Heading
                            fontSize={['1rem', '1.1rem', '1.15rem', '1.15rem']}
                            w={['100%', '100%', 'max-content', 'max-content']}
                          >
                            {article.title}
                          </Heading>
                        </Box>
                      </ArticleTitle>
                    </StyledLink>
                  </Link>
                  <Box
                    d="flex"
                    flexDirection={['column', 'row', 'row', 'row']}
                    justifyContent={['flex-start', 'flex-start', 'flex-end', 'flex-end']}
                    alignItems={['flex-start', 'center', 'center', 'center']}
                    w="100%"
                    flexWrap="wrap"
                  >
                    {article?.languageTags?.map((tag, tagIndex) => {
                      const color = colorMap[tag.toLowerCase()];
                      return (
                        <Tag
                          key={`${blog}${article.id}${tagIndex}`}
                          width="max-content"
                          height="20px"
                          p=".3rem .5rem"
                          fontSize=".8rem"
                          borderRadius="16px"
                          marginBottom="7px"
                          marginRight=".5rem"
                          color="#fff"
                          backgroundColor={color?.color}
                          _hover={{ cursor: 'pointer', backgroundColor: color?.hover }}
                        >
                          {tag}
                        </Tag>
                      );
                    })}
                  </Box>
                </Article>
              ))}
            </Fragment>
          ))}
      </Flex>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const blogPosts = getSortedPostsData();
  // Slicing used to get first four digit of date => YYYY-DD-MM
  const groupedBlogPosts = groupBy(blogPosts, (x) => x.publishedAt.toString().slice(0, 4));
  return {
    props: { groupedBlogPosts, blogPosts },
  };
};