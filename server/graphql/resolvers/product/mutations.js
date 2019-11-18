import {Artisan, Product} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const productMutations = {
  product: authenticated(async (_, args) => {
    const product = new Product({...args.product});
    const artisan = await Artisan.findById(product.artisan);

    const {productType} = product;

    if (!artisan) throw new Error('Artisan does not exists!');

    product.code = artisan.code.toString() + '-' + productType.toString();

    artisan.products.push(product._id);

    try {
      await artisan.save();
      await product.save();
      return product;
    } catch (e) {
      return e;
    }
  }),
};

export default productMutations;
