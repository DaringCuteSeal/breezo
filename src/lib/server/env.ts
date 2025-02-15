export function get_env_variable(name: string): string {
	const val = process.env[name];
	if (!val) {
		throw new Error(`Environment variable ${name} not defined!`)
	}
	return val
}
