function get_env_variable(name: string): string {
	const val = process.env[name];
	if (!val) {
		throw new Error(`Environment variable ${name} not defined!`)
	}
	return val
}

export const PB_DB_URL = get_env_variable("PB_DB_URL");
export const PB_POLLS_COLLECTION_NAME = get_env_variable("PB_POLLS_COLLECTION_NAME");
export const PB_READINGS_COLLECTION_NAME = get_env_variable("PB_READINGS_COLLECTION_NAME");
export const PB_ADMIN_USER = get_env_variable("PB_ADMIN_USER");
export const PB_ADMIN_PASSWORD = get_env_variable("PB_ADMIN_PASSWORD")

class DBError extends Error {
	constructor(message: string) {
		super();
		this.message = message;
		this.name = "Database error";
	}
}

import dayjs from 'dayjs';
import PocketBase from 'pocketbase';
import { isNumber } from 'util';

export const pb = new PocketBase(PB_DB_URL);

type Float = number;

/** Sensor reading. */
export type ReadingEntry = {
	/** The poll ID from DBEntry. */
	poll_id: string,
	name: string,
	value: string
}

/** Type of actual polling database entries. Uploaded by the backend (a.k.a this codebase). */
export type DBEntry = {
	// Unix timestamp.
	timestamp: number,

	// Latitude
	latitude: Float,

	// Longitude
	longitude: Float,

	// Altitude (in meters)
	altitude: Float,
}

/** The poll data that clients can send via the **post endpoint**. */
export type PollData = {
	lat: number,
	long: number,
	alt: number,
	readings: any
}

/** Get a fresh poll ID for a new entry to the polls collection. */
// export async function get_new_poll_id(): Promise<number> {
// 	const query = await pb.collection('breezo_poll').getList(1, 1, {
// 		sort: '-created'
// 	});
// 	
//     if (query.items.length === 0) {
//         return 0; // Default ID
//     }
//
//     const entry: DBEntry = query.items[0].export();
// 	return entry.poll_id + 1;
// }

export async function put_new_poll(data: PollData) {
	// example create data
	const item: DBEntry = {
		altitude: data.alt,
		latitude: data.lat,
		longitude: data.long,
		timestamp: dayjs().unix()
	}
	const record = await pb.collection(PB_POLLS_COLLECTION_NAME).create(item);
	let id = record.id;

	for (const [key, val] of Object.entries(data.readings)) {
		const entry: ReadingEntry = {
			poll_id: id, // link to the previous record
			name: key,
			value: String(val)
		}
		await pb.collection(PB_READINGS_COLLECTION_NAME).create(entry);

	}

	return id;
}
