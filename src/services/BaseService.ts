import { DELETE, GET } from "./Http";
import { ref, set ,update } from "firebase/database";
import {app, dataApp} from "@/lib/firebase";
import {ApiResponse} from "@/services/module/Respons";
import {Store} from "@/services/module/Store";
import {Input} from "@/services/module/Input";
import {Output} from "@/services/module/Output";
import {isArray} from "util";
import {getCookieServer} from "@/actions/serverCookies";

export class BaseService<T> {
  protected static instance?: BaseService<any>;
  public baseUrl = "/";

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
    const token = await getCookieServer('token');

    const res = await set(ref(dataApp,`${token}/${this.baseUrl}/${id}`), dataSend);
    return await this.errorHandler(res);
  }

  public async delete(id: number):  Promise<ApiResponse<T>> {
    const token = await getCookieServer('token');

    try {
      const response = await DELETE(`${token}/${this.baseUrl}/${id}.json`);
      return this.errorHandler(response);
    } catch (error) {
      return this.errorHandler(error);
    }
  }

  public async update(id: number, dataSend: any):Promise<ApiResponse<T>> {
    const token = await getCookieServer('token');

    const res = await update(ref(dataApp,`${token}/${this.baseUrl}/${id}`),dataSend)
    return await this.errorHandler(res);
  }

  public async limitToLast(limit:number):Promise<any> {
    const token = await getCookieServer('token');

    const dataRef =await app.database().ref(`${token}/${this.baseUrl}`).limitToLast(limit);

    const snapshot = await dataRef.once('value');

    if (snapshot.exists() ) {
      const rawData: Input[] | Output[] | Store[] = snapshot.val();
      const cleanedData = Object.values(rawData).filter((item): item is T => item !== null);
      console.log(`${token}/${this.baseUrl}`)

      return this.errorHandler(cleanedData);
    }else       console.log(`${token}/${this.baseUrl}`)

  }

  // ---------------------------------------

  public async errorHandler(res: any): Promise<ApiResponse<T>>{
    if (res instanceof Error) {
      // Handle error
      throw res;
    }

    return res;
  }
}