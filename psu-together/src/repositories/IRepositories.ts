export interface IRepository<T> {
    getAll?(): Promise<T[] | null>;
}
