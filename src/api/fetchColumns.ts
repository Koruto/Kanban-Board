import Column from '../types/Column';
import ColumnList from '../types/ColumnList';
import fetchColumnList from './fetchColumnList';
import fetchData from './fetchData';

export async function fetchColumns(): Promise<ColumnList> {
  try {
    const data: { column_name: string }[] = await fetchColumnList();

    const columnsPromises: Promise<Column>[] = data.map(async (column_list) => {
      const datae = await fetchData(
        `http://localhost:3000/column/${column_list.column_name}`
      );

      return {
        title: column_list.column_name,
        items: datae,
      };
    });

    const columns: Column[] = await Promise.all(columnsPromises);

    const newData: ColumnList = {};

    columns.forEach((data) => {
      newData[data.title] = data;
    });

    return newData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

const data = await fetchColumns();

export default data;
