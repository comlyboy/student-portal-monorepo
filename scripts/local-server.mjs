import concurrently from 'concurrently';

concurrently(
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
