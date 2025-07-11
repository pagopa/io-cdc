import {
  Container,
  CosmosClient,
  Database,
  ItemDefinition,
} from "@azure/cosmos";
import { vi } from "vitest";

let containersItems: Record<string, unknown[]> = {};

export const clearContainersItems = (containerName: string) => {
  console.log(`called clearContainersItems for ${containerName}`);
  if (containersItems[containerName]) containersItems[containerName] = [];
};

export const setMockedItems =
  (containerName: string) =>
  <T>(mockedItems: T[]) => {
    console.log(`called setMockedItems for ${containerName}`);
    containersItems[containerName] = mockedItems;
  };

export let createMocks: Record<string, ReturnType<typeof vi.fn>> = {};
const cosmosCreateMock = (containerName: string) => {
  console.log(`called cosmosCreateMock factory for ${containerName}`);

  if (!createMocks[containerName]) {
    const spy = vi.fn(async <T>(item: T) => {
      console.log(`called cosmosCreateMock spy for ${containerName}`);
      if (!containersItems[containerName]) containersItems[containerName] = [];
      containersItems[containerName].push(item);
    });

    createMocks[containerName] = spy;
  }
  return createMocks[containerName];
};

export let fetchAllMocks: Record<string, ReturnType<typeof vi.fn>> = {};
const cosmosFetchAllMock = (containerName: string) => {
  console.log(`called cosmosFetchAllMock factory for ${containerName}`);

  if (!fetchAllMocks[containerName]) {
    const spy = vi.fn(async () => {
      console.log(`called cosmosFetchAllMock spy for ${containerName}`);
      if (!containersItems[containerName]) containersItems[containerName] = [];
      return {
        resources: containersItems[containerName] as ItemDefinition[],
      };
    });

    fetchAllMocks[containerName] = spy;
  }
  return fetchAllMocks[containerName];
};

const initCosmosMock = (containerName: string) => {
  console.log(`called initCosmosMock for ${containerName}`);
  cosmosCreateMock(containerName);
  cosmosFetchAllMock(containerName);
};

export enum CosmosOperation {
  "fetchAll",
  "create",
}

export const setCosmosErrorMock = (
  containerName: string,
  cosmosOperation: CosmosOperation,
) => {
  switch (cosmosOperation) {
    case CosmosOperation.fetchAll:
      console.log(`called setCosmosErrorMock for ${containerName}/fetchAll`);
      fetchAllMocks[containerName].mockImplementationOnce(() => {
        console.log(`called fetchAll mock fn with cosmosError`);
        throw "Error";
      });
      return;
    case CosmosOperation.create:
      console.log(`called setCosmosErrorMock for ${containerName}/create`);
      createMocks[containerName].mockImplementationOnce(() => {
        console.log(`called create mock fn with cosmosError`);
        throw "Error";
      });
      return;
  }
};

const containers: Record<string, Container> = {};
const getContainerInstance = (containerName: string) => {
  if (!containersItems[containerName]) {
    console.log(`setup items for ${containerName}`);
    containersItems[containerName] = [];
  }
  if (!containers[containerName]) {
    console.log(`setup container for ${containerName}`);
    containers[containerName] = {
      items: {
        create: createMocks[containerName],
        readAll: () => ({
          fetchAll: fetchAllMocks[containerName],
        }),
      },
    } as unknown as Container;
  }
  return containers[containerName];
};

const databaseMock = {
  container: (name: string) => getContainerInstance(name),
} as unknown as Database;

const cosmosDbClientMock: CosmosClient = {
  database: () => databaseMock,
} as unknown as CosmosClient;

export const getCosmosDbClientInstanceMock = (containers: string[]) => {
  for (const c in containers) {
    initCosmosMock(containers[c]);
  }
  return cosmosDbClientMock;
};
