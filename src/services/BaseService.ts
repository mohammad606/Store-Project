import { DELETE, GET, POST, PUT } from "./Http";
import { ref, child, get,set ,update ,push,remove} from "firebase/database";
import {app, dataApp} from "@/lib/firebase";
import {ApiResponse} from "@/services/module/Respons";
import axios, {Axios} from "axios";
import {Store} from "@/services/module/Store";
import {Input} from "@/services/module/Input";
import {Output} from "@/services/module/Output";
import {isArray} from "util";
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
      const cleanedData = isArray(response.data)? (response.data as (T | null)[]).filter(item => item !== null):response.data
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

  public async store(id: number | string,dataSend:any): Promise<ApiResponse<T>> {
    const res = await set(ref(dataApp,`${this.baseUrl}/${id}`), dataSend);
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
    const res = await update(ref(dataApp,`${this.baseUrl}/${id}`),dataSend)
    return await this.errorHandler(res);
  }

  public async limitToLast(limit:number):Promise<any> {
    const dataRef =await app.database().ref(`${this.baseUrl}`).limitToLast(limit);

    const snapshot = await dataRef.once('value');

    if (snapshot.exists() ) {
      const rawData: Input[] | Output[] | Store[] = snapshot.val();

      const cleanedData = Object.values(rawData).filter((item): item is T => item !== null);

      return this.errorHandler(cleanedData);
    }else {
      return {
        massage:'no data'
      }
    }
  }
  public async limitToFirst(limit: number): Promise<any> {
    const dataRef = await app.database().ref(`${this.baseUrl}`).limitToFirst(limit);

    const snapshot = await dataRef.once('value');

    if (snapshot.exists()) {
      const rawData: Input[] | Output[] | Store[] = snapshot.val();
      const cleanedData = Object.values(rawData).filter((item): item is T => item !== null);

      return this.errorHandler(cleanedData);
    } else {
      return {
        message: 'no data'
      };
    }
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