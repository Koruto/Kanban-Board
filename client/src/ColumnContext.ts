import { createContext } from 'react';
import ColumnList from './types/ColumnList';
import data from './api/fetchColumns';

type ColumnContextType = {
  columns: ColumnList;
  setColumns: React.Dispatch<React.SetStateAction<ColumnList>>;
};

const ColumnContextState = {
  columns: data,
  setColumns: () => {},
};

export const ColumnContext =
  createContext<ColumnContextType>(ColumnContextState);
