// tslint:disable-next-line:variable-name
export const Lending = {
  // tslint:disable-next-line:function-name
  __resolveType(obj, context, info) {
    if (obj.amount) {
      return 'MoneyLending';
    }

    if (obj.emoji) {
      return 'ThingLending';
    }

    return null;
  },
};
