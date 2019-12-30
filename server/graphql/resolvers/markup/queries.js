import {Markup} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const markupQueries = {
  markup: async (_, args) => {
    const {id} = args;
    const markup = await Markup.findById(id);

    if (!markup) throw new ApolloError('Markup not found');
    else return markup;
  },
  markups: async (_, {filters: {limit}}) => {
    const markups = await Markup.find({})
      .limit(limit || 10)
      .sort([['name', 1]]);

    if (!markups) throw new ApolloError('No Markups registered!');
    else return markups;
  },
};

export default markupQueries;
