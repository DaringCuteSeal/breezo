export enum DataType {
	/// Stored in celcius in the database.
	TEMPERATURE = "temperature",

	/// Stored in PPM in the database.
	CONCENTRATION = "concentration",

	/// Stored in percentage in the database.
	HUMIDITY = "humidity",
}

export function validate_datatype(input: string): boolean {
	if (
		input == "temperature" ||
		input == "concentration" ||
		input == "humidity"
	)
		return true;
	return false;
}

export function string_to_datatype(input: string): DataType | null {
	switch(input) {
		case "temperature":
			return DataType.TEMPERATURE;
		case "concentration":
			return DataType.CONCENTRATION;
		case "humidity":
			return DataType.HUMIDITY
		default:
			return null;
	}
}
