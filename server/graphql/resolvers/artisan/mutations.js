import {Artisan, Origin} from '../../../database/models';
import {hashSync as hash} from 'bcryptjs';

const artisanMutations = {
  artisan: async (_, args) => {
    try {
      const artisan = new Artisan({...args.artisan});
      const {code} = await Origin.findById(artisan.origin);

      if (!code) throw new Error('Origin does not exists!');

      artisan.code = code + artisan.firstName.toUpperCase().split(' ')[0];
      artisan.password = hash(args.artisan.password || '', 10);
      artisan.username = args.artisan.username.toLowerCase().trim();
      artisan.role = 'ARTISAN';

      if (!artisan.email) artisan.email = `${artisan.username}@gmail.com`;
      else artisan.email = args.artisan.email.toLowerCase().trim();

      await artisan.save();

      return artisan;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default artisanMutations;
