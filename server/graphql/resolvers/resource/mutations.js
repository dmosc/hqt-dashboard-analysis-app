import {Resource} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const resourceMutations = {
  resource: authenticated(async (_, args) => {
    const resource = new Resource({...args.resource});

    try {
      await resource.save();
      return resource;
    } catch (e) {
      return e;
    }
  }),
};

export default resourceMutations;
