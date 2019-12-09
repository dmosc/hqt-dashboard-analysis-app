import {ProductType} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const productTypeMutations = {
  productType: authenticated(async (_, args) => {
    const productType = new ProductType({...args.productType});

    productType.code = productType.code.toUpperCase();

    try {
      await productType.save();
      return productType;
    } catch (e) {
      return e;
    }
  }),
};

export default productTypeMutations;
