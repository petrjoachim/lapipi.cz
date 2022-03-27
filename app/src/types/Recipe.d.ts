export interface ArticleProps {
  heading: string;
  description: string;
  content: string;
  slug: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  hero?: PhotoComponent;
  photos: PhotoComponent[];
  recipes: Recipe[];
  author?: Author;
}

export interface Recipe {
  name: string;
  time: string;
  slug: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  photos: PhotoComponent[];
  instructions: Instruction[];
  ingredients: Ingredient[];
}

export interface Author {
  name: string;
  photo?: PhotoComponent;
}

export interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}
export interface Instruction {
  step: string;
}

interface PhotoComponent {
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
  mime: string;
  formats: {
    thumbnail: PhotoFormatComponent;
    large: PhotoFormatComponent;
    medium: PhotoFormatComponent;
    small: PhotoFormatComponent;
  };
}

interface PhotoFormatComponent {
  // name: string;
  // hash: string;
  // ext: string;
  mime: string;
  width: number;
  height: number;
  // size: number;
  // path: string;
  url: string;
}
