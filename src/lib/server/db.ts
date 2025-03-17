import dayjs from 'dayjs';
import PocketBase from 'pocketbase';
import { get_env_variable } from './env';
import { create } from './db_helper';
import { string_to_datatype, DataType, validate_datatype } from '$lib/common';

export const PB_DB_URL = get_env_variable("PB_DB_URL");
export const PB_POLLS_COLLECTION_NAME = get_env_variable("PB_POLLS_COLLECTION_NAME");
export const PB_READINGS_COLLECTION_NAME = get_env_variable("PB_READINGS_COLLECTION_NAME");
export const PB_ADMIN_USER = get_env_variable("PB_ADMIN_USER");
export const PB_ADMIN_PASSWORD = get_env_variable("PB_ADMIN_PASSWORD")

export const pb = new PocketBase(PB_DB_URL);

type Float = number;

/** Sensor reading. */
export type ReadingEntry = {
	/** The poll ID from DBEntry. */
	poll_id: string,
	name: string,
	datatype: DataType,
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

type Reading = {
	value: Float,
	datatype: string
}

/** The poll data that clients can send via the **post endpoint**. */
export type PollData = {
	access_token: string,
	lat: number,
	long: number,
	alt: number,
	readings: Map<string, Reading>
}

export async function put_new_poll(data: PollData) {
	// example create data
	const item: DBEntry = {
		altitude: data.alt,
		latitude: data.lat,
		longitude: data.long,
		timestamp: dayjs().unix()
	}
	const record = await create(PB_POLLS_COLLECTION_NAME, item);
	let id = record.id;

	for (const [key, val] of Object.entries(data.readings)) {
		if (!validate_datatype(val.datatype)) {
			throw new Error(`${val.value} is not of a valid data type!`)
		}
		const entry: ReadingEntry = {
			poll_id: id, // link to the previous record
			name: key,
			datatype: val.datatype,
			value: String(val.value)
		}
		await create(PB_READINGS_COLLECTION_NAME, entry);
	}

	return id;
}
