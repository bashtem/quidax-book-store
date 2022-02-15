export interface IPaginate<T>{
    records: T[];
    total: number;
    lastPage: number;
    page: number;
}