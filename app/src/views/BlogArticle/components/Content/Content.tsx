/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { ArticleProps } from 'types/Recipe';
import { format, parseISO } from 'date-fns';
import Markdown from 'components/Markdown';

const Content = (article: ArticleProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const photos = [
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img25.jpg',
      rows: 1,
      cols: 2,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img22.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
      rows: 1,
      cols: 2,
    },
  ];

  return (
    <Box>
      {/* Article content */}
      <Box paddingX={{ xs: 0, sm: 4, md: 6 }}>
        <Markdown>{article.content}</Markdown>
      </Box>

      {/* Gallery */}
      <Box marginY={4}>
        <ImageList
          variant="quilted"
          cols={3}
          rowHeight={isMd ? 300 : 220}
          gap={isMd ? 16 : 8}
        >
          {photos.map((item, i) => (
            <ImageListItem key={i} cols={item.cols || 2} rows={item.rows || 1}>
              <LazyLoadImage
                height={'100%'}
                width={'100%'}
                src={item.src}
                alt="..."
                effect="blur"
                style={{
                  objectFit: 'cover',
                  cursor: 'poiner',
                  borderRadius: 8,
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Recipe */}
      {article.recipes.map((recipe) => (
        <Box paddingX={{ xs: 0, sm: 4, md: 6 }} paddingBottom={4}>
          <Box>
            <Typography variant={'h5'} gutterBottom>
              Recept &mdash; {recipe.name}
            </Typography>
            {recipe.instructions.map((instruction) => (
              <Markdown>{instruction.step}</Markdown>
            ))}
          </Box>
        </Box>
      ))}

      <Box paddingY={4}>
        <Divider />
      </Box>

      {/* Author and social box */}
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Avatar
            sx={{ width: 50, height: 50, marginRight: 2 }}
            src={article.author.photo.url}
          />
          <Box>
            <Typography fontWeight={600}>
              {article.author.name ?? 'Lapipi.cz'}
            </Typography>
            <Typography color={'text.secondary'}>
              {format(parseISO(article.publishedAt), 'yyyy / MMM dd')}
            </Typography>
          </Box>
        </Box>
        {/* <Box display={'flex'} alignItems={'center'}>
          <Typography color={'text.secondary'}>Share:</Typography>
          <Box marginLeft={0.5}>
            <IconButton aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Content;
