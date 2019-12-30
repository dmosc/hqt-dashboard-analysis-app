import {Artisan, Garment, ProductType, Markup} from '../../../database/models';
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
    const {markup} = await Markup.findOne({
      $or: [
        {
          $and: [
            {low: {$lte: productionPrice}},
            {high: {$gte: productionPrice}},
          ],
        },
        {high: {$lte: productionPrice}},
      ],
    }).sort([['high', -1]]);

    if (!markup) throw new Error('Register some markup prices first!');

    const retailPrice = productionPrice + markup;

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
