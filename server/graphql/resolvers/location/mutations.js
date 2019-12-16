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
  locationEdit: authenticated(async (_, args) => {
    try {
      const location = await Location.findOneAndUpdate(
        {_id: args.location.id},
        {...args.location},
        {new: true}
      );

      if (!location) throw new Error("Couldn't find location");

      return location;
    } catch (e) {
      return e;
    }
  }),
};

export default locationMutations;
