const { withModuleFederationPlugin } =
	require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	name: 'studentInfo',
	exposes: {
		'./App': './projects/student-info/src/app/app.ts',
	},
	shared: {
		'@angular/core': { singleton: true, strictVersion: true },
		'@angular/common': { singleton: true, strictVersion: true },
		'@angular/router': { singleton: true, strictVersion: true }
	}
});
