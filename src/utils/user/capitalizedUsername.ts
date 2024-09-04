const capitalizedUsername = (username: string): string => {
  return username[0].toUpperCase() + username.slice(1).toLowerCase();
};

export default capitalizedUsername;