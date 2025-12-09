const {
	withModuleFederationPlugin,
	shareAll
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	shared: shareAll({
		singleton: true,
		strictVersion: true,
		requiredVersion: 'auto'
	})
});
