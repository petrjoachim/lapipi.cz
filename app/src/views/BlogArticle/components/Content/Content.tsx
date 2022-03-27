/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { ArticleProps } from 'types/Recipe';
import { format, parseISO } from 'date-fns';
import Markdown from 'components/Markdown';
import { Stack } from '@mui/material';

const Content = (article: ArticleProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const photos = article.photos.concat(
    ...article.recipes.map((recipe) => recipe.photos),
  );
  const [current, setCurrent] = useState(photos[0]);

  return (
    <Box>
      {/* Article content */}
      <Box paddingX={{ xs: 0, sm: 4, md: 6 }}>
        <Markdown>{article.content}</Markdown>
      </Box>

      {/* Gallery */}
      <Box>
        <Stack
          direction={'row'}
          spacing={2}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          {photos.map((photo, i) => (
            <Box
              key={`photo-${i}`}
              onClick={() => setCurrent(photo)}
              sx={{
                width: 80,
                height: 'auto',
                cursor: 'pointer',
                '& img': {
                  width: 1,
                  height: 1,
                  objectFit: 'cover',
                  borderRadius: 2,
                },
              }}
            >
              <img src={photo.url} alt={photo.caption} />
            </Box>
          ))}
        </Stack>
        {current && (
          <Box
            sx={{
              marginBottom: 2,
              width: 1,
              height: 'auto',
              '& img': {
                width: 1,
                height: 1,
                objectFit: 'cover',
                borderRadius: 2,
              },
            }}
          >
            <img src={current.url} alt={current.caption} />
          </Box>
        )}
      </Box>

      {/* Recipe */}
      {article.recipes.map((recipe, i) => (
        <Box
          key={`recipe-${i}`}
          paddingX={{ xs: 0, sm: 4, md: 6 }}
          paddingBottom={4}
        >
          <Box>
            <Typography variant={'h5'} gutterBottom>
              Postup &mdash; {recipe.name} &mdash; {recipe.time}
            </Typography>
            {recipe.ingredients.map((ingredient, i) => (
              <Typography key={`ingredient-${i}`}>
                {ingredient.amount} {ingredient.unit} &mdash; {ingredient.name}
              </Typography>
            ))}
            {recipe.instructions.map((instruction, i) => (
              <Box key={`instruction-${i}`}>
                <Typography variant={'h4'}>{i + 1}</Typography>
                <Markdown>{instruction.step}</Markdown>
              </Box>
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
