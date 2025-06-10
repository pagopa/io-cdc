import { describe, expect, it, vi } from "vitest";
import { RedisClientFactory } from "../../utils/redis.js";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";

const getTaskMock = vi.fn().mockReturnValue(TE.right(O.some("sessiontoken")));
const deleteTaskMock = vi.fn().mockReturnValue(TE.right(true));

vi.mock("../../utils/redis_storage.js", () => ({
  getTask: getTaskMock,
  deleteTask: deleteTaskMock,
}));

const { getTask, deleteTask } = await import("../../utils/redis_storage.js");
const { getSessionToken } = await import("../authorize");

describe("getSessionToken", () => {
  it("Should retrieve the session token", async () => {
    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      redisClientFactory: undefined as unknown as RedisClientFactory,
    })();
    expect(E.isRight(res)).toBe(true);
  });

  it("Should fail if redis fail", async () => {
    getTaskMock.mockReturnValueOnce(TE.left(new Error("any error")));
    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      redisClientFactory: undefined as unknown as RedisClientFactory,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) {
      expect(res.left).toEqual({
        code: 500,
        message: "any error",
        title: "Internal Server Error",
      });
    }
  });
});
