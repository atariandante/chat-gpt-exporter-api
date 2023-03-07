import { CreateNotionBlockParams } from '../types';

const createNotionBlock = (params: CreateNotionBlockParams) => {
  const { content, pageId } = params;

  return {
    Name: {
      type: 'Test title',
      title: '',
    },
  };
};

export default createNotionBlock;
