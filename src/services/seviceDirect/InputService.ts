import { BaseService } from "@/services/BaseService";
import {Input} from "@/services/module/Input";

export class InputService extends BaseService<Input> {
    getBaseUrl(): string {
        return `h9dspwpI7ydRKZY6gJyDULiNgBA2/input_and_output_data/input`;
    }
}