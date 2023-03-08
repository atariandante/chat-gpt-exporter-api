import { createRichText } from './createRichText';
import { fromStringNodeToNotionKey } from './fromNodeToNotionKey';

const createNotionBlock = (rawBlocks: any[]) => {
  const blocks = [];

  rawBlocks.forEach((block) => {
    // if is a code block, return assume that is only one item always. Work around the entire PRE code
    if (block.type === 'code-block') {
      const [codeBlock] = block[block.type].content;

      blocks.push({
        type: 'code',
        code: {
          language: codeBlock.language,
          rich_text: [createRichText(codeBlock)],
        },
      });

      return;
    }

    // If is a list, map and return the list items
    if (block.type === 'ol' || block.type === 'ul') {
      const listKey = fromStringNodeToNotionKey(block.type);

      block[block.type].content.forEach((item) => {
        blocks.push({
          type: listKey,
          [listKey]: {
            rich_text: item.content.map((text) => createRichText(text)),
          },
        });
      });

      return;
    }

    // If is a paragraph, map and return the paragraph
    blocks.push({
      type: block.type,
      paragraph: {
        rich_text: block[block.type].content.map((text) =>
          createRichText(text)
        ),
      },
    });
  }, []);

  return blocks;
};

export default createNotionBlock;
