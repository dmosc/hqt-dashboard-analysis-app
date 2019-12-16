import {Artisan, Garment, ProductType} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const garmentMutations = {
  garment: authenticated(async (_, args) => {
    const garment = new Garment({...args.garment});

    const artisan = await Artisan.findById(garment.artisan).select(
      'code products'
    );
    const productType = await ProductType.findOneAndUpdate(
      {_id: garment.productType},
      {$inc: {count: 1}},
      {new: false}
    ).select('_id code count');

    if (!artisan) throw new Error('Artisan does not exists!');
    if (!productType) throw new Error('Product Type does not exists!');

    const {productionPrice} = garment;
    const retailPrice =
      productionPrice +
      (productionPrice <= 200
        ? 100
        : productionPrice <= 600
        ? 150
        : productionPrice <= 1000
        ? 170
        : 220);

    delete garment.rawMaterialsPrice;
    garment.retailPrice = retailPrice;
    garment.markup = retailPrice - productionPrice;
    garment.code =
      artisan.code.toString() +
      artisan.products.length.toString() +
      '-' +
      productType.code.toString() +
      '-' +
      productType.count.toString();

    artisan.products.push(garment._id);

    try {
      await garment.save();
      await artisan.save();
      return garment;
    } catch (e) {
      return e;
    }
  }),
};

export default garmentMutations;
