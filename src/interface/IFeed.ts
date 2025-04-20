import { IUser } from "./IUser";

export interface Ifeed {
  description: string;
  feeds: File[];
  userId: string;
}

export interface IFeedList {
  id: string;
  description: string;
  feeds: {
    image: string[],
    video: string[]
  };
  user: IUser;
  createdAt: string
}
