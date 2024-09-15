import { createContext, useEffect, useState } from 'react'
import './App.css'
import Table from './components/Table'
import { ITableContext, IUser } from './interfaces/user';

export const TableContext = createContext<ITableContext>({
  data: [],
  setData: () => {},
  page: 1,
  setPage: () => {},
  query: '',
  setQuery: () => {},
  pageSize: 0
});

function App() {
  const [data, setData] = useState<IUser[]>([]);
  const [filteredData, setFilteredData] = useState<IUser[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pageSize = 10;

  async function fetchData() {
    const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    const serializedData = await res.json();
    setData(serializedData);
    setFilteredData(serializedData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(!searchQuery) {
      if(filteredData.length !== data.length) setFilteredData(data);
      return;
    }
    const fData = filteredData.filter((item, _) => item.email.toLocaleLowerCase().includes(searchQuery)
      || item.name.toLocaleLowerCase().includes(searchQuery)
      || item.role.toLocaleLowerCase().includes(searchQuery)
    );
    setFilteredData(fData);
    setCurrPage(1);
  }, [searchQuery]);

  return (
    <TableContext.Provider value={{
      data: filteredData,
      setData: setFilteredData,
      page: currPage,
      setPage: setCurrPage,
      query: searchQuery,
      setQuery: setSearchQuery,
      pageSize: pageSize
    }}>
      <Table />
    </TableContext.Provider>
  )
}

export default App
