import { pb, PB_ADMIN_USER, PB_ADMIN_PASSWORD, PB_DB_URL, put_new_poll } from '$lib/server/db';
import { type DBEntry, type PollData } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { authorize } from '$lib/server/access';


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
		if (!await authorize(item.access_token)) {
			return new Response(JSON.stringify({result: `error: unauthorized`}), {status: 401})
		};

		id = await put_new_poll(item);
	} catch (err) {
		return new Response(JSON.stringify({result: `error: ${err}`}), {status: 400});
	}

	return new Response(JSON.stringify({
		result: "ok",
		id: id
	}), {status: 200}
	)

}) satisfies RequestHandler;
