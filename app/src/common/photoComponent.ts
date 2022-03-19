import { PhotoComponent, PhotoFormatComponent } from 'types/Recipe';

function getAbsoluteUrl(url: string) {
  return (process.env.BACKEND_URL ?? 'http://localhost:1337') + url;
}

export function makePhotoComponent(data: any): PhotoComponent {
  if (!data) {
    return undefined;
  }
  return {
    alternativeText: data.alternativeText,
    caption: data.caption,
    width: +data.width,
    height: +data.height,
    mime: data.mime,
    url: getAbsoluteUrl(data.url),
    formats: {
      thumbnail: makePhotoFormatComponent(data.formats?.thumbnail),
      large: makePhotoFormatComponent(data.formats?.large),
      medium: makePhotoFormatComponent(data.formats?.medium),
      small: makePhotoFormatComponent(data.formats?.small),
    },
  };
}

export function makePhotoFormatComponent(data: any): PhotoFormatComponent {
  if (!data) {
    return undefined;
  }
  return {
    mime: data.mime,
    width: +data.width,
    height: +data.height,
    url: getAbsoluteUrl(data.url),
  };
}
