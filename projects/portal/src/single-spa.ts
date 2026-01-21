import { registerApplication, start } from 'single-spa';

registerApplication({
	name: 'student-info',
	app: () => (window as any).System.import('student-info'),
	// app: () => import('student-info'),
	activeWhen: () => true,
	customProps: {
		domElementGetter: () =>
			document.getElementById('mf-student-info'),
	},
});

start();
