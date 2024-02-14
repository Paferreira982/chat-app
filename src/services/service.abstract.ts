export type BadResponseType = {
    error: "INTERNAL_SERVER_ERROR" | "UNAUTHORIZED" | "NOT_FOUND" | "BAD_REQUEST";
    message?: string;
}

export abstract class Service {
    protected readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async get<T>(url: string, token?: string): Promise<T | BadResponseType> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.json();
    }

    protected async post<T>(url: string, data: any, token?: string): Promise<T | BadResponseType> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return response.json();
    }

    protected async put<T>(url: string, data: any, token?: string): Promise<T | BadResponseType> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return response.json();
    }

    protected async delete<T>(url: string, token?: string): Promise<T | BadResponseType> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        return response.json();
    }
}