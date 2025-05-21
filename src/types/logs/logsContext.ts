import { Log } from "./logsTypes";

export type LogsState = {
  loading: boolean;
  logs: Log[];
  error: string;
};

export type LogsContextType = LogsState & {
  getLogs: () => void;
};

export type LogsAction =
  | {
      type: "GET_LOGS";
      payload: Log[];
    }