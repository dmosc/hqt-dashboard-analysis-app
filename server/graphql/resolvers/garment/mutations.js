import {Artisan, Garment} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const garmentMutations = {
  garment: authenticated(async (_, args) => {
    const garment = new Garment({...args.garment});

    const artisan = await Artisan.findById(garment.artisan);

    if (!artisan) throw new Error('Artisan does not exists!');

    const {weight, workforceCost, totalDaysToProduce, productType} = garment;
    const {rawMaterialsPrice} = args.garment;

    const productionPrice =
      (totalDaysToProduce / 24) * workforceCost + weight * rawMaterialsPrice;

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
    garment.productionPrice = productionPrice;
    garment.retailPrice = retailPrice;
    garment.code = artisan.code.toString() + '-' + productType.toString();

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
