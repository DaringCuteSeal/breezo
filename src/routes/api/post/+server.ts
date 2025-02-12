import { type DBEntry } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
// export const POST = (async ({ request }) => {
// 	const item: DBEntry  = await request.json();
// 	return json({
// 		"val": item.timestamp
// 	});
// }) satisfies RequestHandler;

export const POST: RequestHandler = async ({ request }) => {
	const { a, b } = await request.json();
	return json(a + b);
};
