type Float = number;

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
