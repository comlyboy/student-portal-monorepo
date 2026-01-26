// shared/events.ts
export type PortalEventMap = {
	'auth:login': { userId: string; token: string };
	'auth:logout': void;
	'student:selected': { studentId: string };
};
