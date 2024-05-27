
export enum ApiErrorType {
    CONNECTION_ERROR = "connection-error",
    UNAUTHORIZED = "unauthorized",
    UNAUTHENTICATED = "unAuthenticated",
    BadRequestException = "BadRequestException",
    UNKNOWN_ERROR = "unknown-error",
    NOT_FOUND = "not-found",
    Validation = "error-validation",
    NotRegister = "not-register",
    Admin = "admin",
    Customer = "customer",
    Doctor = "doctor",
}

export interface ValidationError {
    errors: {
        [k: string]: string;
    };
    text?: string;
}

export interface ApiResponsePagination {
    currentPage: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    total_pages: number;
    isFirst: boolean;
    isLast: boolean;
}

export class ApiResponse<T> {
    public data: T;
    public status: boolean | undefined | null;
    public code: number;
    public message: string | ValidationError | undefined | null;
    public statusText:string
    public headers:any
    public request:any
    constructor(
        data: T,
        headers:any,
        request:any,
        statusText:string,
        status: boolean = true,
        code: number = 500,
        message: string | ValidationError | undefined | null = null,
    ) {
        this.data = data;
        this.request=request
        this.headers=headers
        this.statusText=statusText
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public getValidationError(): [string, string][] | undefined {
        return this.message &&
        typeof this.message != "string" &&
        this.message?.hasOwnProperty("errors") &&
        this.code == 405
            ? Object.entries(this.message?.errors)
            : undefined;
    }

    public hasValidationErrors() {
        return !!this.getValidationError();
    }
}