module.exports = (base, commits, separator = '+') => {
  return commits.reduce((searches, commit) => {
    const lastSearch = searches[searches.length - 1];

    if (lastSearch && lastSearch.length + commit.length <= 256 - separator.length) {
      searches[searches.length - 1] = `${lastSearch}${separator}${commit}`;
    } else {
      searches.push(`${base}${separator}${commit}`);
    }

    return searches;
  }, []);
};
