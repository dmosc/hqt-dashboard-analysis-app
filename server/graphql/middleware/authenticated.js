const authenticated = next => (root, args, context, info) => {
  const {user} = context;
  if (!user) throw new Error(`User is not authenticated!`);

  return next(root, args, context, info);
};

export default authenticated;
