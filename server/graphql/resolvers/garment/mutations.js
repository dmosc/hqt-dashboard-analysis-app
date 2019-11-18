import {Artisan, Garment} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const garmentMutations = {
  garment: authenticated(async (_, args) => {
    const garment = new Garment({...args.garment});

    const artisan = await Artisan.findById(garment.artisan);

    if (!artisan) throw new Error('Artisan does not exists!');

    const {weight, workforceCost, totalDaysToProduce, garmentType} = garment;
    const {rawMaterialsPrice} = args.garment;

    const garmentionPrice =
      (totalDaysToProduce / 24) * workforceCost + weight * rawMaterialsPrice;

    const retailPrice =
      garmentionPrice +
      (garmentionPrice <= 200
        ? 100
        : garmentionPrice <= 600
        ? 150
        : garmentionPrice <= 1000
        ? 170
        : 220);

    delete garment.rawMaterialsPrice;
    garment.garmentionPrice = garmentionPrice;
    garment.retailPrice = retailPrice;
    garment.code = artisan.code.toString() + '-' + garmentType.toString();

    artisan.garments.push(garment._id);

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
