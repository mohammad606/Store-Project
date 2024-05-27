import { BaseService } from "@/services/BaseService";
import {Store} from "@/services/module/Store";

export class StoreService extends BaseService<Store[]> {
    getBaseUrl(): string {
        return `h9dspwpI7ydRKZY6gJyDULiNgBA2/store`;
    }
}