const capitalizeFirstLetter = (_string: string): string => {
  return _string[0].toUpperCase() + _string.slice(1).toLowerCase();
};

export default capitalizeFirstLetter;