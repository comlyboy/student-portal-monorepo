const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	name: 'portal',
	remotes: {
		studentInfo: 'studentInfo@http://localhost:4201/remoteEntry.js'
	}
});