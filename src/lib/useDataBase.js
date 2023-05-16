import { mockData } from "../mockData";

export const useDataBase = () => {
  // POST new data
  const postData = () =>
    mockData.map((entry) =>
      fetch("http://localhost:3001/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      }).then((response) => {
        console.log(response);
      })
    );

  // DELETE data by ID
  const deleteEntryById = (id) =>
    fetch(`http://localhost:3001/data/${id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
    });

  return { postData, deleteEntryById };
};
