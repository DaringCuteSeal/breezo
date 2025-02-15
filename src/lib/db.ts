type Float = number;
function get_env_variable(name: string): string {
	const val = process.env[name];
	if (!val) {
		throw new Error(`Environment variable ${val} not defined!`)
	}
	return val
}

export const PB_DB_URL = get_env_variable("PB_DB_URL");
export const PB_POLL_COLLECTION_NAME = get_env_variable("PB_POLL_COLLECTION_NAME");
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

export type Coordinate = {
	latitude: number,
	longitude: number,

	// altitude in meters
	altitude: number,
}

export type DBEntry = {
	// Unix timestamp.
	timestamp: number,

	// The given coordinate.
	coordinate: Coordinate,

	// The sensor readings.
	readings: Record<string, Float>
}
