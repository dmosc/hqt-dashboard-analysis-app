import {ProductType, Product} from '../../../database/models';
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
  productTypeEdit: authenticated(async (_, args) => {
    try {
      const productType = await ProductType.findOneAndUpdate(
        {_id: args.productType.id},
        {...args.productType},
        {new: false}
      );

      if (!productType) throw new Error("Couldn't find productType");

      const products = await Product.find({productType: productType.id});
      if (!products) throw new Error("Couldn't update products!");

      for (let i = 0; i < products.length; i++) {
        products[i].code = products[i].code.replace(
          productType.code,
          args.productType.code
        );
        await products[i].save();
      }

      return productType;
    } catch (e) {
      return e;
    }
  }),
};

export default productTypeMutations;
