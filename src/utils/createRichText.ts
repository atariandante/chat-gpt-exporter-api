import {
  NotionAnnotationType,
  isNotionAnnotationType,
} from './isNotionAnnotationType';

export const createRichText = (text: {
  content: string;
  type: NotionAnnotationType & 'link';
  link?: string;
}) => {
  return {
    text: {
      content: text.content,
      ...(text.type === 'link' && {
        link: {
          url: text.link,
        },
      }),
    },

    ...(isNotionAnnotationType(text.type) && {
      annotations: {
        [text.type]: true,
      },
    }),

    plain_text: text.content,
  };
};
