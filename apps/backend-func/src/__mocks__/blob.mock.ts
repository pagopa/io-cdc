import { BlockBlobUploadResponse, ContainerClient } from "@azure/storage-blob";
import { vi } from "vitest";

export const uploadMock = vi.fn().mockResolvedValue({
  _response: { status: 200 },
} as unknown as BlockBlobUploadResponse);

const blockBlobClientMock = {
  upload: uploadMock,
};

export const getBlockBlobClientMock = vi
  .fn()
  .mockReturnValue(blockBlobClientMock);

export const blobContainerClientMock = {
  getBlockBlobClient: getBlockBlobClientMock,
} as unknown as ContainerClient;
