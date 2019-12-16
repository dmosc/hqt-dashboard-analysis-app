import {Seller} from '../../../database/models';
import authenticated from '../../middleware/authenticated';
import {hashSync as hash} from 'bcryptjs';

const sellerMutations = {
  seller: authenticated(async (_, args) => {
    const seller = new Seller({...args.seller});

    const {email, password, username} = seller;
    if (email) seller.email = args.seller.email.toLowerCase().trim();
    if (password || password === '')
      seller.password = hash(seller.password || '', 10);
    if (username) seller.username = args.seller.username.toLowerCase().trim();

    try {
      await seller.save();
      return seller;
    } catch (e) {
      return e;
    }
  }),
  sellerEdit: authenticated(async (_, args) => {
    const seller = await Seller.findOneAndUpdate(
      {_id: args.seller.id},
      {...args.seller},
      {new: true}
    );

    if (!seller) throw new Error("Couldn't find seller");

    const {email, password, username} = seller;
    if (email) seller.email = args.seller.email.toLowerCase().trim();
    if (password || password === '')
      seller.password = hash(args.seller.password, 10);
    if (username) seller.username = args.seller.username.toLowerCase().trim();

    try {
      await seller.save();
      return seller;
    } catch (e) {
      return e;
    }
  }),
};

export default sellerMutations;
