import concurrently from 'concurrently';

const { result } = concurrently(
	[
		{
			command: 'ng serve portal',
			name: 'portal',
			prefixColor: 'green'
		},
		{
			command: 'ng serve student-info',
			name: 'student-info',
			prefixColor: 'yellow'
		}
	],
	{
		killOthersOn: ['failure'],
		restartTries: 0
	}
);

result.then().catch((error) => {
	console.error('[concurrently failed]');
	process.exit(1);
});
