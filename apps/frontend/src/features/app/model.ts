export type AppState = {
  years: YearsList;
};

export type YearsList = string[];

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
