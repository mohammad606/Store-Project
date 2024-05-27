import { BaseService } from "@/services/BaseService";
import {Output} from "@/services/module/Output";

export class OutputService extends BaseService<Output> {
    getBaseUrl(): string {
        console.log(this.baseUrl)
        return `h9dspwpI7ydRKZY6gJyDULiNgBA2/input_and_output_data/output`;
    }
}