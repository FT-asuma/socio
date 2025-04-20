import { Dispatch, SetStateAction } from "react";
import { Ifeed } from "./IFeed";

export interface IAppContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  isUpdated: string;
  setIsUpdated: React.Dispatch<React.SetStateAction<string>>;
  notification: string;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  toggleTheme: () => void;
  setUser: Dispatch<SetStateAction<any>>
  user: any
}
