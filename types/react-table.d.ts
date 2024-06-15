// types/react-table.d.ts
import {
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UseSortByOptions,
    UseSortByInstanceProps,
    UseSortByState,
    TableOptions,
    TableInstance,
    TableState,
    ColumnInterface,
    ColumnInstance,
    HeaderGroup,
    UsePaginationState,
    UseTableHeaderGroupProps,
    ColumnInterfaceBasedOnValue,
    UseTableColumnProps,
    UseSortByColumnProps,
    globalFilter, Hooks, Row, IdType, FilterTypes, FilterValue, UseTableInstanceProps, Renderer, HeaderProps
} from 'react-table';

declare module 'react-table' {
    export function useFilters<D extends object = {}>(hooks: Hooks<D>): void;

    export namespace useFilters {
        const pluginName = "useFilters";
    }

    export type UseFiltersOptions<D extends object> = Partial<{
        manualFilters: boolean;
        disableFilters: boolean;
        defaultCanFilter: boolean;
        filterTypes: FilterTypes<D>;
        autoResetFilters?: boolean | undefined;
    }>;

    export interface UseFiltersState<D extends object> {
        filters: Filters<D>;
    }

    export type UseFiltersColumnOptions<D extends object> = Partial<{
        Filter: Renderer<FilterProps<D>>;
        disableFilters: boolean;
        defaultCanFilter: boolean;
        filter: FilterType<D> | DefaultFilterTypes | string;
    }>;

    export interface UseFiltersInstanceProps<D extends object> {
        preFilteredRows: Array<Row<D>>;
        preFilteredFlatRows: Array<Row<D>>;
        preFilteredRowsById: Record<string, Row<D>>;
        filteredRows: Array<Row<D>>;
        filteredFlatRows: Array<Row<D>>;
        filteredRowsById: Record<string, Row<D>>;
        rows: Array<Row<D>>;
        flatRows: Array<Row<D>>;
        rowsById: Record<string, Row<D>>;
        setFilter: (columnId: IdType<D>, updater: ((filterValue: FilterValue) => FilterValue) | FilterValue) => void;
        setAllFilters: (updater: Filters<D> | ((filters: Filters<D>) => Filters<D>)) => void;
    }

    export interface UseFiltersColumnProps<D extends object> {
        canFilter: boolean;
        setFilter: (updater: ((filterValue: FilterValue) => FilterValue) | FilterValue) => void;
        filterValue: FilterValue;
        preFilteredRows: Array<Row<D>>;
        filteredRows: Array<Row<D>>;
    }

    export type FilterProps<D extends object> = HeaderProps<D>;
    export type FilterValue = any;
    export type Filters<D extends object> = Array<{ id: IdType<D>; value: FilterValue }>;
    export type FilterTypes<D extends object> = Record<string, FilterType<D>>;

    export type DefaultFilterTypes =
        | "text"
        | "exactText"
        | "exactTextCase"
        | "includes"
        | "includesAll"
        | "exact"
        | "equals"
        | "between";

    export interface FilterType<D extends object> {
        (rows: Array<Row<D>>, columnIds: Array<IdType<D>>, filterValue: FilterValue): Array<Row<D>>;

        autoRemove?: ((filterValue: FilterValue) => boolean) | undefined;
    }
    export function useGlobalFilter<D extends object = {}>(hooks: Hooks<D>): void;
    export type UseGlobalFiltersOptions<D extends object> = Partial<{
        globalFilter: ((rows: Array<Row<D>>, columnIds: Array<IdType<D>>, filterValue: any) => Array<Row<D>>) | string;
        manualGlobalFilter: boolean;
        filterTypes: FilterTypes<D>;
        autoResetGlobalFilter?: boolean | undefined;
        disableGlobalFilter?: boolean | undefined;
    }>;

    export interface UseGlobalFiltersState<D extends object> {
        globalFilter: any;
    }

    export type UseGlobalFiltersColumnOptions<D extends object> = Partial<{
        disableGlobalFilter?: boolean | undefined;
    }>;

    export interface UseGlobalFiltersInstanceProps<D extends object> {
        preGlobalFilteredRows: Array<Row<D>>;
        preGlobalFilteredFlatRows: Array<Row<D>>;
        preGlobalFilteredRowsById: Record<string, Row<D>>;
        globalFilteredRows: Array<Row<D>>;
        globalFilteredFlatRows: Array<Row<D>>;
        globalFilteredRowsById: Record<string, Row<D>>;
        rows: Array<Row<D>>;
        flatRows: Array<Row<D>>;
        rowsById: Record<string, Row<D>>;
        setGlobalFilter: (filterValue: FilterValue) => void;
    }
    export interface TableOptions<D extends object>
        extends UsePaginationOptions<D>,
            UseSortByOptions<D> {}
    export interface TableInstance<D extends object = {}>
        extends Omit<TableOptions<D>, "columns" | "pageCount">, UseTableInstanceProps<D>
    {}
    export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>> {
        setGlobalFilter: (filterValue: string | undefined) => void;
    }
    export interface TableState<D extends Record<string, unknown> = Record<string, unknown>> {
        globalFilter: string | undefined;
    }
    export interface TableInstance<D extends object = {}>
        extends UsePaginationInstanceProps<D>,
            UseSortByInstanceProps<D> {}

    export interface TableState<D extends object = {}>
        extends UseSortByState<D>,
            UsePaginationState<D> {}

    export interface ColumnInterface<D extends object = {}> {}
    export interface ColumnInstance<D extends object = {}>
        extends Omit<ColumnInterface<D>, "id">, ColumnInterfaceBasedOnValue<D>, UseTableColumnProps<D>
    {}
    export interface HeaderGroup<D extends object = {}> extends ColumnInstance<D>, UseTableHeaderGroupProps<D> ,UseSortByColumnProps<D>{}

}