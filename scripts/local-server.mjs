import concurrently from 'concurrently';

concurrently(
	[
		{
			command: 'ng serve portal',
			name: 'portal',
			prefixColor: 'green'
		},
		{
			command: 'ng serve student-info --port 4201',
			name: 'student-info',
			prefixColor: 'yellow'
		}
	],
	{
		killOthersOn: ['failure'],
		restartTries: 0
	}
);
