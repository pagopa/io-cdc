import {
  Container,
  CosmosClient,
  Database,
  ItemDefinition,
} from "@azure/cosmos";

let items: unknown[] = [];

const containerMock = {
  items: {
    create: async <T>(item: T) => {
      items.push(item);
    },
    readAll: () => ({
      fetchAll: async () => ({ resources: items as ItemDefinition[] }),
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
