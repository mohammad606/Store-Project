import axios from "axios";

export const GET = async (
  url: string,
  params?: object,
): Promise<any> => {
  return await http("GET", url, params);
};

export const POST = async (
  url: string,
  data: any,
): Promise<any> => {
  return await http("POST", url, undefined, data);
};

export const PUT = async (
  url: string,
  data: any,
): Promise<any> => {
  return await http("PUT", url, undefined, data);
};

export const DELETE = async (
  url: string,
  params?: object,
  headers?: object,
): Promise<any> => {
  return await http("DELETE", url, headers, params);
};

const http = async (
  method: string,
  url: string,
  params?: object,
  data?: object | undefined,
): Promise<any> => {


  const config = {
    params: params,
    baseURL: process.env.localApi,
    url: url,
  };

  try {
    let response: any;
    switch (method) {
      case "GET":
        response = await axios.get(url, config);
        break;
      case "POST":
        response = await axios.post(url, data, config);
        break;
      case "PUT":
        response = await axios.post(url, { _method: "PUT", ...data }, config);
        break;
      case "DELETE":
        response = await axios.delete(url, config);
        break;
      default:
        response = await axios.get(url, config);
        break;
    }
    return response
  } catch (error: any) {
    return handleError(error);
  }
};

function handleError(error: any): any {
  console.log(error)
}
