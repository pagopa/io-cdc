import { Database } from "@azure/cosmos";
import * as E from "fp-ts/lib/Either.js";
import { afterEach, assert, describe, expect, it, vi } from "vitest";

import {
  clearContainersItems,
  CosmosOperation,
  createMocks,
  fetchAllMocks,
  getCosmosDbClientInstanceMock,
  setCosmosErrorMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import { aCardRequest, aValidFiscalCode } from "../../__mocks__/types.mock.js";
import { CosmosDbCardRequestRepository } from "../card_request_repository.js";

describe("CosmosDbCardRequestRepository|constructor", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should return a CosmosDbCardRequestRepository given a cosmos database", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    const repository = new CosmosDbCardRequestRepository(
      cosmosDbClientMock.database("a-database"),
    );
    expect(repository).toBeDefined();
  });

  //eslint-disable-next-line vitest/expect-expect
  it("Should throw if given an invalid cosmos database for CosmosDbCardRequestRepository", async () => {
    assert.throws(
      () => new CosmosDbCardRequestRepository({} as unknown as Database),
      "db.container is not a function",
    );
  });
});

describe("CosmosDbCardRequestRepository|operations", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should throw when CosmosDbCardRequestRepository cosmos fails during fetch", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbCardRequestRepository.containerName,
      CosmosOperation.fetchAll,
    );

    const repository = new CosmosDbCardRequestRepository(
      cosmosDbClientMock.database("a-database"),
    );
    const cards = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(E.isLeft(cards)).toBe(true);
    if (E.isLeft(cards)) expect(cards.left).toEqual(new Error("Error"));
  });

  it("Should return an empty list of CardRequests when getAllByFiscalCode is invoked and there are no records", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);

    const repository = new CosmosDbCardRequestRepository(
      cosmosDbClientMock.database("a-database"),
    );
    const cards = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(E.isRight(cards)).toBe(true);
    if (E.isRight(cards)) expect(cards.right).toEqual([]);
  });

  it("Should return a list of CardRequests when getAllByFiscalCode is invoked and there are records", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    setMockedItems(CosmosDbCardRequestRepository.containerName)([aCardRequest]);

    const repository = new CosmosDbCardRequestRepository(
      cosmosDbClientMock.database("a-database"),
    );
    const cards = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(E.isRight(cards)).toBe(true);
    if (E.isRight(cards)) expect(cards.right).toEqual([aCardRequest]);
  });

  it("Should throw when CosmosDbCardRequestRepository cosmos fails during create", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbCardRequestRepository.containerName,
      CosmosOperation.create,
    );

    const repository = new CosmosDbCardRequestRepository(
      cosmosDbClientMock.database("a-database"),
    );
    
    const inserted = await repository.insert(aCardRequest)();
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(E.isLeft(inserted)).toBe(true);
    if (E.isLeft(inserted)) expect(inserted.left).toEqual(new Error("Error"));
  });

  it("Should insert a new CardRequest when insert is invoked", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    clearContainersItems(CosmosDbCardRequestRepository.containerName);

    const repository = new CosmosDbCardRequestRepository(
      cosmosDbClientMock.database("a-database"),
    );

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
