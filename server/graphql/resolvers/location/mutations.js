import {Location} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const locationMutations = {
  location: authenticated(async (_, args) => {
    const location = new Location({...args.location});

    try {
      await location.save();
      return location;
    } catch (e) {
      return e;
    }
  }),
};

export default locationMutations;
