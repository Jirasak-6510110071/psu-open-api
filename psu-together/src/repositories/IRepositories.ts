export interface IRepository<T> {
    getAll?(): Promise<T[] | null>;
    getByCampusID?(id: string) : Promise<T[] | null>
}
