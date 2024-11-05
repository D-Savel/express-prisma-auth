
function pluralToSingular(pluralString: string): string {

  if (pluralString.endsWith('ies')) {
    return pluralString.slice(0, -3) + 'y';
  } else {
    return pluralString.slice(0, -1);
  }
}
export default pluralToSingular;