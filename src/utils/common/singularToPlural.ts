
function singularToPlural(singularString: string): string {

  if (singularString.endsWith('y')) {
    return singularString.slice(0, -1) + 'ies';
  } else {
    return singularString + 's';
  }
}
export default singularToPlural;