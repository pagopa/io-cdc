import { Database } from "@azure/cosmos";
import * as E from "fp-ts/lib/Either.js";
import { afterEach, assert, describe, expect, it, vi } from "vitest";

import {
  CosmosOperation,
  clearContainersItems,
  createMocks,
  fetchAllMocks,
  getCosmosDbClientInstanceMock,
  setCosmosErrorMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import { aRequestAudit, aValidFiscalCode } from "../../__mocks__/types.mock.js";
import { CosmosDbRequestAuditRepository } from "../request_audit_repository.js";

describe("CosmosDbRequestAuditRepository|constructor", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should return a CosmosDbRequestAuditRepository given a cosmos database", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbRequestAuditRepository.containerName,
    ]);
    const repository = new CosmosDbRequestAuditRepository(
      cosmosDbClientMock.database("a-database"),
    );
    expect(repository).toBeDefined();
  });

  //eslint-disable-next-line vitest/expect-expect
  it("Should throw if given an invalid cosmos database for CosmosDbRequestAuditRepository", async () => {
    assert.throws(
      () => new CosmosDbRequestAuditRepository({} as unknown as Database),
      "db.container is not a function",
    );
  });
});

describe("CosmosDbRequestAuditRepository|operations", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should throw when CosmosDbRequestAuditRepository cosmos fails during fetch", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbRequestAuditRepository.containerName,
      CosmosOperation.fetchAll,
    );
    const repository = new CosmosDbRequestAuditRepository(
      cosmosDbClientMock.database("a-database"),
    );
    const audits = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(E.isLeft(audits)).toBe(true);
    if (E.isLeft(audits)) expect(audits.left).toEqual(new Error("Error"));
  });

  it("Should return an empty list of RequestAudits when getAllByFiscalCode is invoked and there are no records", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbRequestAuditRepository.containerName,
    ]);
    const repository = new CosmosDbRequestAuditRepository(
      cosmosDbClientMock.database("a-database"),
    );
    const audits = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(E.isRight(audits)).toBe(true);
    if (E.isRight(audits)) expect(audits.right).toEqual([]);
  });

  it("Should return a list of RequestAudits when getAllByFiscalCode is invoked and there are records", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setMockedItems(CosmosDbRequestAuditRepository.containerName)([
      aRequestAudit,
    ]);
    const repository = new CosmosDbRequestAuditRepository(
      cosmosDbClientMock.database("a-database"),
    );
    const audits = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(E.isRight(audits)).toBe(true);
    if (E.isRight(audits)) expect(audits.right).toEqual([aRequestAudit]);
  });

  it("Should throw when CosmosDbRequestAuditRepository cosmos fails during create", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbRequestAuditRepository.containerName,
      CosmosOperation.create,
    );

    const repository = new CosmosDbRequestAuditRepository(
      cosmosDbClientMock.database("a-database"),
    );

    const inserted = await repository.insert(aRequestAudit)();
    expect(
      createMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(E.isLeft(inserted)).toBe(true);
    if (E.isLeft(inserted)) expect(inserted.left).toEqual(new Error("Error"));
  });

  it("Should insert a new RequestAudits when insert is invoked", async () => {
    const cosmosDbClientMock = getCosmosDbClientInstanceMock([
      CosmosDbRequestAuditRepository.containerName,
    ]);
    clearContainersItems(CosmosDbRequestAuditRepository.containerName);

    const repository = new CosmosDbRequestAuditRepository(
      cosmosDbClientMock.database("a-database"),
    );

    const audits = await repository.getAllByFiscalCode(aValidFiscalCode)();
    expect(E.isRight(audits)).toBe(true);
    if (E.isRight(audits)) expect(audits.right).toEqual([]);

    const inserted = await repository.insert(aRequestAudit)();
    expect(E.isRight(inserted)).toBe(true);
    if (E.isRight(inserted)) {
      const audits = await repository.getAllByFiscalCode(aValidFiscalCode)();
      expect(E.isRight(audits)).toBe(true);
      if (E.isRight(audits)) expect(audits.right).toEqual([aRequestAudit]);
    }
  });
});
