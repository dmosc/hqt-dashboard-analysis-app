import {Origin} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const originMutations = {
  origin: authenticated(async (_, args) => {
    const origin = new Origin({...args.origin});

    const {municipality, community, group} = origin;
    origin.code = [
      municipality.substring(0, 2).toUpperCase(),
      community.substring(0, 2).toUpperCase(),
      group,
    ].join('');
    origin.municipality = municipality.toUpperCase();
    origin.community = community.toUpperCase();

    try {
      await origin.save();
      return origin;
    } catch (e) {
      return e;
    }
  }),
};

export default originMutations;
