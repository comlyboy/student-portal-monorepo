import { withModuleFederationPlugin } from '@angular-architects/module-federation/webpack';

export default withModuleFederationPlugin({
	name: 'sharedUI',
	filename: 'remoteEntry.js',

	exposes: {
		'./ui': './src/public-api.ts'
	},

	shared: {
		'@angular/core': { singleton: true, strictVersion: true },
		'@angular/common': { singleton: true, strictVersion: true },
		rxjs: { singleton: true },
	},
});
