declare module "better-sqlite3" {
    export interface Statement {
        run(...params: any[]): any;
        get(...params: any[]): any;
        all(...params: any[]): any[];
    }

    export interface Database {
        prepare(sql: string): Statement;
        exec(sql: string): Database;
        pragma(source: string): unknown;
        close(): void;
    }

    export interface DatabaseOptions {
        readonly?: boolean;
        fileMustExist?: boolean;
        timeout?: number;
        verbose?: (...params: any[]) => void;
    }

    interface Constructor {
        new (filename: string, options?: DatabaseOptions): Database;
        (filename: string, options?: DatabaseOptions): Database;
    }

    const BetterSqlite3: Constructor;
    export default BetterSqlite3;
}
