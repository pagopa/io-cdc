import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { RedisClient, RedisClientFactory } from "../redis";
import { describe, expect, it } from "vitest";

const aRedisKey = "KEY";
const aRedisValue = "VALUE";

