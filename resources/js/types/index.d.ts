export interface Auth {
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    flash: Record<string, unknown>;
    auth: Auth;
};
