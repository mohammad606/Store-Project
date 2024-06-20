import { BaseService } from "@/services/BaseService";
import {Inventory} from "@/services/module/Inventory";
import {ApiResponse} from "@/services/module/Respons";
import {GET} from "@/services/Http";

export class InventoryService extends BaseService<Inventory[]> {
    getBaseUrl(): string {
        return `inventory`;
    }
    public async show(id:number): Promise<ApiResponse<Inventory>> {
        return await GET(`inventory/${id}.json`);
    }
}