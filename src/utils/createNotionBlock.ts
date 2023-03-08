import { CreateNotionBlockParams } from '../types';
import { createRichText } from './createRichText';
import { fromStringNodeToNotionKey } from './fromNodeToNotionKey';

const createNotionBlock = (rawBlocks: any[]) => {
  const blocks = [];

  console.log({
    rawBlocks: rawBlocks.map((block) => {
      if (block.type === 'ol' || block.type === 'ul') {
        return block[block.type].content.map((item) => item.type);
      }

      return block.type;
    }),
  });

  rawBlocks.forEach((block) => {
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

  console.log({
    blocks,
  });

  return blocks;
};

export default createNotionBlock;
