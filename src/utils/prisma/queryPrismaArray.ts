function queryPrismaArray(queryKeys: object, pathRequest: object | null): object[] {
  let queryArray: object[] = [];
  for (const [key, value] of Object.entries(queryKeys)) {
    if ((value as string).includes(',')) {
      const valueArray = (value as string).split(',');
      for (const subValue of valueArray) {
        queryArray = [...queryArray, { [`${key}`]: subValue }];
      }
    } else {
      queryArray = [...queryArray, { [`${key}`]: value }];
    }
  }
  queryArray = [...queryArray, pathRequest!];
  return queryArray;
}

export default queryPrismaArray;