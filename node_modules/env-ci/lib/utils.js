function prNumber(pr) {
	return (/\d+(?!.*\d+)/.exec(pr) || [])[0];
}

function parseBranch(branch) {
	return branch ? /^(?:refs\/heads\/)?(?<branch>.+)$/i.exec(branch)[1] : undefined;
}

module.exports = {prNumber, parseBranch};
