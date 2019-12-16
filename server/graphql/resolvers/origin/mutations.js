import {Origin, Artisan} from '../../../database/models';
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
  originEdit: authenticated(async (_, args) => {
    try {
      const origin = await Origin.findOneAndUpdate(
        {_id: args.origin.id},
        {...args.origin},
        {new: true}
      );

      if (!origin) throw new Error("Couldn't find origin");

      const {municipality, community, group} = origin;
      origin.code = [
        municipality.substring(0, 2).toUpperCase(),
        community.substring(0, 2).toUpperCase(),
        group,
      ].join('');
      origin.municipality = municipality.toUpperCase();
      origin.community = community.toUpperCase();

      const artisans = await Artisan.find({origin: origin.id});
      for (let i = 0; i < artisans.length; i++) {
        artisans[i].code =
          origin.code.toString() +
          artisans[i].code.substring(origin.code.length + 1);
        await artisans[i].save();
      }

      await origin.save();
      return origin;
    } catch (e) {
      return e;
    }
  }),
};

export default originMutations;
