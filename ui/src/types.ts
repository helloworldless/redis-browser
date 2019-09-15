export enum RedisCommand {
  GET_HASH_FIELD = "Get Hash Field (HGET)",
  SET_HASH_FIELD = "Set Hash Field (HSET)",
  GET_HASH_FIELDS = "Get Hash Fields (HGETALL)",
  DELETE_HASH_FIELD = "Delete Hash Field (HDEL)"
}

export enum RedisCommandType {
  READ = "READ",
  WRITE = "WRITE"
}

export interface CommandResult {
  resultCode: number;
  resultDescription: string;
  result: boolean;
}
