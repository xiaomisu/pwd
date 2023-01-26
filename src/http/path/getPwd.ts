import {dataType, Get} from "../index";

export interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>;

// export function getUserInfo<T = { name: string }>(id: string): ApiResponse<T> {
//   return Get<dataType>("/api/getPwd", { id });
// }

// export const userApi = {
//   getUserInfo,
// };
