import {User} from '../../../database/models';

const userMutations = {
  user: async (_, args) => {
    const user = new User({...args.user});
    try {
      await user.save();
      return user;
    } catch (e) {
      return null;
    }
  }
};

export default userMutations;
