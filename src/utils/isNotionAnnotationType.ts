type NotionAnnotationType =
  | 'underline'
  | 'color'
  | 'strikethrough'
  | 'code'
  | 'bold';

export const isNotionAnnotationType = (type: NotionAnnotationType): Boolean => {
  return (
    type === 'underline' ||
    type === 'color' ||
    type === 'strikethrough' ||
    type === 'code' ||
    type === 'bold'
  );
};
