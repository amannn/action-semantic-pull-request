module.exports = ({type, main}) => type === 'prerelease' || (type === 'release' && !main);
