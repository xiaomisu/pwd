import axios from "axios";

import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError,
} from "./tools";

type Fn = (data: dataType) => FcResponse<dataType>;

interface IAnyObj {
  [index: string]: unknown;
}

export interface dataType {
    pwd: string;
    id:string
}

interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: dataType;
}

axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config);
  config = handleConfigureAuth(config);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    handleAuthError(response.data.errno);
    handleGeneralError(response.data.errno, response.data.errmsg);
    return response;
  },
  (err) => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  }
);

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  clearFn?: Fn
): Promise<FcResponse<T>> =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFn !== undefined) {
          res = clearFn(result.data) ;
        } else {
          res = result.data ;
        }
        resolve(res);
      })
      .catch((err) => {
        resolve(err);
      });
  });

export const Post = <T>(
  url: string,
  data: IAnyObj,
  params: IAnyObj = {}
): Promise< FcResponse<dataType>> => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        resolve(result as unknown as FcResponse<dataType>);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};
