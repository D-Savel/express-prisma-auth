
function fieldsToPrismaSelect(fields: string) {
  const fieldsArray: string[] = fields.split(',');
  let selectPrisma: object | null = null;
  if (fieldsArray.length === 0) {
    return selectPrisma;
  } else {
    selectPrisma = {};
    for (const field of fieldsArray) {
      selectPrisma = { ...selectPrisma, [field]: true };
    }
    return selectPrisma;
  }
}
export default fieldsToPrismaSelect;