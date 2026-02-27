/**
 * Use a singleton CosmosDB client across functions.
 */
import { CosmosClient } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

let cosmosDbClientInstance: CosmosClient;

export const getCosmosDbClientInstance = (dbUri: string) => {
  if (!cosmosDbClientInstance) {
    cosmosDbClientInstance = new CosmosClient({
      aadCredentials: new DefaultAzureCredential(),
      endpoint: dbUri,
    });
  }
  return cosmosDbClientInstance;
};
