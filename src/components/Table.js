import { useState, useMemo } from "react";
const useSortableData = (data, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  
  const sortedItems = useMemo(() => {
    let sortableItems = [...data];  
    if (sortConfig !== null) {                      //if sortConfig != to null(sortConfig===name or amount or distance)
      sortableItems.sort((a, b) => {                //sorting
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;                             //if sortConfig == null we return simple items else sortconfig !== null we return sorteditems
  }, [data, sortConfig]);

  const requestSort = key => {    // ascending sort and descending
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  return { items: sortedItems, requestSort, sortConfig }; // end func
}
function Table(props) {
    const {data} = props
    const [page, setPage] = useState(0);
    const {items, requestSort, sortConfig } = useSortableData(props.data);  //useSortableData func return sortedItems & requestSort func & sort config
    const rowsPerPage = 10;  //default rows per page equal to 10
    console.log(sortConfig);
    
    const onClickNextPage = () => {
            setPage(page+rowsPerPage);  //on click current page + rows per page
    }
    const onClickPreviousPage = () => {
        setPage(page-rowsPerPage);    // on click current page - rows per page
    }




  return (
    <>
      <table
        className="table table-striped table-dark"
        style={{ height: "600px" }}
      >
        <thead>
          <tr style={{ height: "50px" }}>
            <th scope="col">#</th>
            <th scope="col">
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "white",
                }}
                onClick={() => requestSort("name")}
              >
                {sortConfig === null  //if null it is first iteration and we get default items
                  ? "Name"
                  : sortConfig.direction === "ascending" && 
                    sortConfig.key === "name"
                  ? "Name +"        //else ascending sorted items
                  : "Name -"        //else descending sorted items
                  
                }      
              </button>
            </th>
            <th scope="col">
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "white",
                }}
                onClick={() => requestSort("amount")}
              >
                {sortConfig === null
                  ? "Amount"
                  : sortConfig.direction === "ascending" &&
                    sortConfig.key === "amount"
                  ? "Amount +"
                  : "Amount -"}
              </button>
            </th>
            <th scope="col">
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "white",
                }}
                onClick={() => requestSort("distance")}
              >
                {sortConfig === null
                  ? "Distance"
                  : sortConfig.direction === "ascending" &&
                    sortConfig.key === "distance"
                  ? "Distance +"
                  : "Distance -"}
              </button>
            </th>
            <th scope="col">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {items.slice(page, page + rowsPerPage).map((item) => ( //pagination with method slice(current page(0), current page + rowsPerpage(10))
            <tr style={{ height: "50px" }} key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.distance}</td>
              <td>{item.created_date}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ height: "50px" }}>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {page + rowsPerPage > data.length //if page count more than data size, it should be show the last element else page(page=currentpage+rowsPerPage)
                ? page + " - " + data.length + " of " + data.length
                : page + " - " + (page + rowsPerPage) + " of " + data.length}
            </td>
            <td>
              {page - rowsPerPage < 0 ? ( // if page count less than 0 we add disabled attribute to button else default
                <button disabled onClick={() => onClickPreviousPage()}>
                  Previous Page
                </button>
              ) : (
                <button onClick={() => onClickPreviousPage()}>
                  Previous Page
                </button>
              )}
              {page + rowsPerPage > data.length ? ( // if page count more than data size we add disabled attribute to button else default
                <button disabled onClick={() => onClickNextPage()}>
                  Next Page
                </button>
              ) : (
                <button onClick={() => onClickNextPage()}>Next Page</button>
              )}
            </td>
          </tr>
        </tfoot>
        <div></div>
      </table>
    </>
  );
}

export default Table;
