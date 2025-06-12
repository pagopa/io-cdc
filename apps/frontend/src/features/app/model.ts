export type AppState = {
  years: YearsList;
};

export type YearsList = string[];

export type RequestedYearsList = Array<{ year: string }>;

export type Year = {
  label: string;
  value: string;
  alreadyRequested: boolean;
};

export type ApiError = {
  status: number;
  data: {
    message: string;
  };
};

export type SessionParams = {
  id: string;
};

export type SessionResponseDTO = {
  token: string;
};
