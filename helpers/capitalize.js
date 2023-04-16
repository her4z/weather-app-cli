const capitalize = (str) => {
  const capitalizedString = str.replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );
  return capitalizedString;
};

export { capitalize };
