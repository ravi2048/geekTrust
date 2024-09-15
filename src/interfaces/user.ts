export interface IUser {
    id: number,
    name: string,
    email:string,
    role: string,
    checked?: boolean,
}

export interface ITableContext {
    data: IUser[],
    setData: React.Dispatch<React.SetStateAction<IUser[]>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
    pageSize: number
}