const App = `import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";

export default function App() {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState({count: 0, results: []});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function getData(page) {
      const response = await fetch(\`https://swapi.py4e.com/api/people?page=\${page}\`);

      return await response.json();
    }

    setIsLoading(true);
    getData(page).then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [page]);

  const rowsPerPage = 10;

  const pages = React.useMemo(() => {
    return data.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data, rowsPerPage]);

  const loadingState =
    isLoading || (data.results && data.results.length === 0) ? "loading" : "idle";

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody
        items={data.results}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
