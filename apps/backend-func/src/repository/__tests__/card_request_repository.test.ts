import { Database } from "@azure/cosmos";
import * as E from "fp-ts/lib/Either.js";
import { afterEach, assert, describe, expect, it, vi } from "vitest";

import {
  clearMockedItems,
  getCosmosDbClientInstanceMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import { aCardRequest, aValidFiscalCode } from "../../__mocks__/types.mock.js";
import { CosmosDbCardRequestRepository } from "../card_request_repository.js";

const cosmosDbClientMock = getCosmosDbClientInstanceMock();

describe("constructor", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should return a CosmosDbCardRequestRepository given a cosmos database", async () => {
    const repository = new CosmosDbCardRequestRepository(
      cosmosDbClientMock.database("a-database"),
    );
    expect(repository).toBeDefined();
  });

  //eslint-disable-next-line vitest/expect-expect
  it("Should throw if given an invalid cosmos database", async () => {
    assert.throws(
      () => new CosmosDbCardRequestRepository({} as unknown as Database),
      "db.container is not a function",
    );
  });
});

describe("operations", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const repository = new CosmosDbCardRequestRepository(
    cosmosDbClientMock.database("a-database"),
  );

  it("Should return an empty list of CardRequests when getAllByFiscalCode is invoked and there are no records", async () => {
    const cards = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(E.isRight(cards)).toBe(true);
    if (E.isRight(cards)) expect(cards.right).toEqual([]);
  });

  it("Should return a list of CardRequests when getAllByFiscalCode is invoked and there are records", async () => {
    setMockedItems([aCardRequest]);
    const cards = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(E.isRight(cards)).toBe(true);
    if (E.isRight(cards)) expect(cards.right).toEqual([aCardRequest]);
  });

  it("Should insert a new CardRequest when insert is invoked", async () => {
    clearMockedItems();

    const cards = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(E.isRight(cards)).toBe(true);
    if (E.isRight(cards)) expect(cards.right).toEqual([]);

    const inserted = await repository.insert(aCardRequest)();
    expect(E.isRight(inserted)).toBe(true);
    if (E.isRight(inserted)) {
      const cards = await repository.getAllByFiscalCode(aValidFiscalCode)();
      expect(E.isRight(cards)).toBe(true);
      if (E.isRight(cards)) expect(cards.right).toEqual([aCardRequest]);
    }
  });
});
