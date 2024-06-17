import { BaseService } from "@/services/BaseService";
import {Input} from "@/services/module/Input";
import {Inventory} from "@/services/module/Inventory";

export class InventoryService extends BaseService<Inventory[]> {
    getBaseUrl(): string {
        return `h9dspwpI7ydRKZY6gJyDULiNgBA2/inventory`;
    }
}