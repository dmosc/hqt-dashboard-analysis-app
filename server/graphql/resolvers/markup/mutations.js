import {Markup} from '../../../database/models';
import authenticated from '../../middleware/authenticated';

const markupMutations = {
  markup: authenticated(async (_, args) => {
    const markup = new Markup({...args.markup});

    try {
      await markup.save();
      return markup;
    } catch (e) {
      return e;
    }
  }),
  markupEdit: authenticated(async (_, args) => {
    try {
      const markup = await Markup.findOneAndUpdate(
        {_id: args.markup.id},
        {...args.markup},
        {new: true}
      );

      if (!markup) throw new Error("Couldn't find markup");

      return markup;
    } catch (e) {
      return e;
    }
  }),
};

export default markupMutations;
