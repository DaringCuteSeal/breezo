import { pb, PB_ADMIN_USER, PB_ADMIN_PASSWORD, PB_DB_URL, put_new_poll } from '$lib/db';
import { type DBEntry, type PollData } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


if (PB_ADMIN_PASSWORD != undefined && PB_ADMIN_USER != undefined)
{
	await pb.collection('_superusers').authWithPassword(PB_ADMIN_USER, PB_ADMIN_PASSWORD);
}
else
{
	throw new Error("Admin password for database not set!");
}

export const POST = (async ({ request }) => {
	let id;
	try {
		const item: PollData =  await request.json();
		id = await put_new_poll(item);
	} catch (err) {
		return json({result: `error: ${err}`})
		
	}

	return json({
		result: "ok",
		id: id
	})
}) satisfies RequestHandler;
