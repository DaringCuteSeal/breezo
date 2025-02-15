import type { ListResult, RecordListOptions, RecordModel } from "pocketbase";
import { pb } from "./db";

/** Query a collection. Returns a paginated list. */
export async function query_list(collection: string, options: RecordListOptions = {}, page: number = 1, per_page: number = 50): Promise<ListResult<RecordModel>> {
	const query = await pb.collection(collection).getList(page, per_page, options);
    return query;
}
/** Query a collection. Returns the full list. */
export async function query_full_list(collection: string, options: RecordListOptions = {}): Promise<Array<RecordModel>> {
	const query = await pb.collection(collection).getFullList(options)
    return query;
}

/** Query just one item from a collection based on its ID. */
export async function query_one(collection: string, id: string, options: RecordListOptions): Promise<RecordModel> {
	const query = await pb.collection(collection).getOne(id, options);
	return query;
}

/** Create an item and insert it to a collection. Returns the successfully inserted record. */
export async function create(collection: string, item: any): Promise<RecordModel> {
	const query = await pb.collection(collection).create(item);
	return query;
}
