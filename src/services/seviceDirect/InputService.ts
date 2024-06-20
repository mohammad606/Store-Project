import { BaseService } from "@/services/BaseService";
import {Input} from "@/services/module/Input";
import {ApiResponse} from "@/services/module/Respons";
import {Output} from "@/services/module/Output";
import {GET} from "@/services/Http";

export class InputService extends BaseService<Input[]> {
    getBaseUrl(): string {
        return `input_and_output_data/input`;
    }
    public async show(id:number): Promise<ApiResponse<Input>> {
        return await GET(`input_and_output_data/input/${id}.json`);
    }
}