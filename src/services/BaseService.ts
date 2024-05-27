import { DELETE, GET, POST, PUT } from "./Http";
import { ref, child, get,set ,update ,push,remove} from "firebase/database";
import {data} from "@/lib/firebase";
import {ApiResponse} from "@/services/module/Respons";
import axios, {Axios} from "axios";
import {Store} from "@/services/module/Store";
export class BaseService<T> {
  protected static instance?: BaseService<any>;
  public baseUrl = "/";
  public userId = 'DuHrWiApQtc2zMH0Q17tdPyj0ED3';

  constructor() {}

  public static make<Service extends BaseService<any>>(): Service {
    if (!this.instance) {
      this.instance = new this();
    }

    this.instance.baseUrl = this.instance.getBaseUrl();

    return this.instance as Service;
  }
  public getBaseUrl() {
    return "/";
  }

  public setBaseUrl(url: string) {
    this.baseUrl = url;
    return this;
  }

  //--------------------------
  public async ReadDataBase(): Promise<ApiResponse<T | null>> {

    try {
      const response = await GET(`${this.baseUrl}.json`);
      const cleanedData = (response.data as (T | null)[]).filter(item => item !== null);
      // @ts-ignore
      const res: ApiResponse<(T | null)[]> = {
        data: cleanedData,
        code:response.code,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        request: response.request,
        message:response.message
      };
      return this.errorHandler(res);
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  public async store(id: number,dataSend:any): Promise<ApiResponse<T>> {
    const res = await set(ref(data,`${this.baseUrl}/${id}`), dataSend);
    return await this.errorHandler(res);
  }

  public async delete(id: number):  Promise<ApiResponse<T>> {
    try {
      const response = await DELETE(`${this.baseUrl}/${id}.json`);
      return this.errorHandler(response);
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  public async update(id: number, dataSend: any):Promise<ApiResponse<T>> {
    const res = await update(ref(data,`${this.baseUrl}/${id}`),dataSend)
    return await this.errorHandler(res);
  }

  // ---------------------------------------

  public async errorHandler(res: any): Promise<ApiResponse<T>>{
    if (res instanceof Error) {
      // Handle error
      console.error(res.message);
      throw res;
    }

    return res;
  }
}