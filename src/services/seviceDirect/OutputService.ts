import { BaseService } from "@/services/BaseService";
import {Output} from "@/services/module/Output";
import {ApiResponse} from "@/services/module/Respons";
import {GET} from "@/services/Http";

export class OutputService extends BaseService<Output[]> {
    getBaseUrl(): string {
        return `input_and_output_data/output`;
    }

    public async show(id:number): Promise<ApiResponse<Output>> {
        return await GET(`input_and_output_data/output/${id}.json`);
    }

}