// to make the file a module and avoid the TypeScript error

export { };

export type Car = {
    vandor: string,
    model: string,
    color: string,
    image?: string
}

export type Role = {
    name: string
}

declare global {
    export namespace Express {
        interface Request {
            userId?: string;
        }
    }
}