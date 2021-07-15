export type AllowedContentTypes = 'JSON' | 'PDF';

export interface IContent {
  description: string;
  image?: string;
  title: string;
  type_: AllowedContentTypes;
}
