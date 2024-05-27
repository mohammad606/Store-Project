import { BaseService } from "@/services/BaseService";

export class OutputService extends BaseService<any> {
    getBaseUrl(): string {
        console.log(this.baseUrl)
        return `h9dspwpI7ydRKZY6gJyDULiNgBA2/input_and_output_data/output`;
    }
}