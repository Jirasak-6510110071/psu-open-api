export interface IRepository<T> {
    getAll?(api : string) : Promise<T[] | null>;
    getById?(api : string) : Promise<T[] | null>;

    getData?(api : string) : Promise<T | null>;
    getImage?(api : string): Promise<T | null>;
}
