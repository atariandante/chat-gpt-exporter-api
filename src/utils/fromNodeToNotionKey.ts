export const fromStringNodeToNotionKey = (
  node: string
): 'paragraph' | 'bulleted_list_item' | 'numbered_list_item' => {
  switch (node) {
    case 'ol':
      return 'numbered_list_item';

    case 'ul':
      return 'bulleted_list_item';

    default:
      return 'paragraph';
  }
};
