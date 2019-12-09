import {Artisan, Product, Location} from '../../../database/models';
import authenticated from '../../middleware/authenticated';
import {User, ProductType} from '../../../database/models/index';

const productMutations = {
  product: authenticated(async (_, args) => {
    const product = new Product({...args.product});
    const artisan = await Artisan.findById(product.artisan);
    const productType = await ProductType.findById(product.productType).select(
      '_id code'
    );

    if (!artisan) throw new Error('Artisan does not exists!');
    if (!productType) throw new Error('Product Type does not exists!');

    product.code = artisan.code.toString() + '-' + productType.code.toString();

    artisan.products.push(product._id);

    try {
      await artisan.save();
      await product.save();
      return product;
    } catch (e) {
      return e;
    }
  }),
  sell: authenticated(async (_, args) => {
    try {
      const oldProduct = await Product.findById(args.product.id);
      const seller = await User.findOne({username: args.product.seller}).select(
        'id'
      );

      if (!oldProduct) throw new Error('Product is not available!');
      if (!seller) throw new Error('Seller is not registered!');

      const product = await Product.findOneAndUpdate(
        {_id: args.product.id},
        {...args.product, seller}
      );
      return product;
    } catch (e) {
      throw new Error(e);
    }
  }),
  receive: authenticated(async (_, args) => {
    try {
      const oldProduct = await Product.findById(args.product.id);
      const location = await Location.findById(args.product.location);

      if (!oldProduct) throw new Error('Product is not available!');
      if (!location) throw new Error('Location is not registered!');

      const product = await Product.findOneAndUpdate(
        {_id: args.product.id},
        {location}
      );

      return product;
    } catch (e) {
      throw new Error(e);
    }
  }),
};

export default productMutations;
