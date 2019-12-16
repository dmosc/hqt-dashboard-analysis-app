import {Artisan, Origin, Product} from '../../../database/models';
import authenticated from '../../middleware/authenticated';
import {hashSync as hash} from 'bcryptjs';

const artisanMutations = {
  artisan: authenticated(async (_, args) => {
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
  }),
  artisanEdit: authenticated(async (_, args) => {
    const artisan = await Artisan.findOneAndUpdate(
      {_id: args.artisan.id},
      {...args.artisan},
      {new: true}
    );

    if (!artisan) throw new Error("Couldn't find Artisan");

    const {password, username} = artisan;
    if (!artisan.email) artisan.email = `${artisan.username}@gmail.com`;
    else artisan.email = args.artisan.email.toLowerCase().trim();
    if (password || password === '')
      artisan.password = hash(args.artisan.password, 10);
    if (username) artisan.username = args.artisan.username.toLowerCase().trim();

    const {code} = await Origin.findById(artisan.origin);

    if (!code) throw new Error('Origin does not exists!');
    artisan.code = code + artisan.firstName.toUpperCase().split(' ')[0];

    const products = await Product.find({artisan: artisan.id});
    if (!products) throw new Error("Couldn't update products!");

    for (let i = 0; i < products.length; i++) {
      products[i].code =
        artisan.code.toString() +
        products[i].code.substring(products[i].code.indexOf('-'));
      await products[i].save();
    }

    try {
      await artisan.save();
      return artisan;
    } catch (e) {
      return e;
    }
  }),
};

export default artisanMutations;
