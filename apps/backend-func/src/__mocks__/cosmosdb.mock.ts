import {
  Container,
  CosmosClient,
  Database,
  ItemDefinition,
} from "@azure/cosmos";
import { vi } from "vitest";

let items: unknown[] = [];

export const cosmosCreateMock = vi
  .fn()
  .mockImplementation(async <T>(item: T) => {
    items.push(item);
  });

export const cosmosFetchAllMock = vi
  .fn()
  .mockImplementation(async () => ({ resources: items as ItemDefinition[] }));

const containerMock = {
  items: {
    create: cosmosCreateMock,
    readAll: () => ({
      fetchAll: cosmosFetchAllMock,
    }),
  },
} as unknown as Container;

const databaseMock = {
  container: () => containerMock,
} as unknown as Database;

const cosmosDbClientMock: CosmosClient = {
  database: () => databaseMock,
} as unknown as CosmosClient;

export const clearMockedItems = () => {
  items = [];
};

export const setMockedItems = <T>(mockedItems: T[]) => {
  items = mockedItems;
};

export const getCosmosDbClientInstanceMock = () => cosmosDbClientMock;
