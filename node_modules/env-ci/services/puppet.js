// https://puppet.com/docs/pipelines-for-apps/enterprise/environment-variable.html

module.exports = {
	detect({env}) {
		return Boolean(env.DISTELLI_APPNAME);
	},
	configuration({env}) {
		return {
			name: 'Puppet',
			service: 'puppet',
			build: env.DISTELLI_BUILDNUM,
			buildUrl: env.DISTELLI_RELEASE,
			commit: env.DISTELLI_RELREVISION,
			branch: env.DISTELLI_RELBRANCH,
			root: env.DISTELLI_INSTALLHOME,
		};
	},
};
