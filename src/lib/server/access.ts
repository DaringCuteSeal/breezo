import { query_full_list } from "./db_helper";
import { get_env_variable } from "./env";

export const PB_ACCESS_TOKENS_COLLECTIONS_NAME = get_env_variable("PB_ACCESS_TOKENS_COLLECTION_NAME");
export const PB_ADMINS_COLLECTIONS_NAME = get_env_variable("PB_ADMINS_COLLECTIONS_NAME");

async function validate_access_token(token: string): Promise<boolean> {
	let access_tokens = await query_full_list(PB_ACCESS_TOKENS_COLLECTIONS_NAME);
	if (access_tokens.some(item => item.token == token)) {
		return true
	}
	return false
}

export async function authorize(token: string): Promise<boolean> {
	if (await validate_access_token(token)) {
		return true;
	}
	return false;
}
