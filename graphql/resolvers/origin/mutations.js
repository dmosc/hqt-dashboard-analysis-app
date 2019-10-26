import {Origin} from '../../../database/models';

const originMutations = {
  origin: async (_, args) => {
    const origin = new Origin({...args.origin});
    const {municipality, community, group} = origin;
    origin.code = [
      municipality.substring(0, 2).toUpperCase(),
      community.substring(0, 2).toUpperCase(),
      group
    ].join('');

    try {
      await origin.save();
      return origin;
    } catch (e) {
      return e;
    }
  }
};

export default originMutations;
