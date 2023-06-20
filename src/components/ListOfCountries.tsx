import React, { useEffect, useState } from "react";

export interface CountryData {
  name: string;
  region: string;
  area?: number;
  independent: boolean;
}

let results: CountryData[];

export default function ListOfCountries({ name, region, area }: CountryData) {

  // useStates to handle the different states
  const [data, setData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [error, setError] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Fetching data from the API
  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => setError(err));
  }, []);


  // Paginating result by setting limits of results on each page
  useEffect(() => {
    const paginate = (page: number, limit: number) => {
      return data.slice((page - 1) * limit, page * limit);
    };

    const paginatedResult = paginate(page, 10);
    setPaginatedData(paginatedResult);
    setTotalPages(Math.ceil(data.length / 10));
  }, [page]);



  return (
    <div className="w-[100%] mx-auto">
      <ul className="mt-10">
      <div className="p-2">
        <button
          className="p-2 mx-auto bg-green-400 text-black font-bold  border border-green-700 rounded"
          onClick={() => {
            page !== totalPages && setPage(page + 1);
          }}
        >
          Next Page
        </button>
        <button
          className="p-2 ml-5 mx-auto bg-green-400 text-black font-bold border border-green-700 rounded"
          onClick={() => {
            page !== 1 && setPage(page - 1);
          }}
        >
          Previous Page
        </button>
      </div>
        {paginatedData?.sort().map((data: CountryData, idex) => (
          <div className="w-[80%] border-2 bg-green-300 pt-1 pb-2 mb-5 p-2">
            <li
              className="mx-2 font-bold leading-6 text-[24px] bg-green-900  w-6/12"
              key={idex}
            >
              Country: {data.name}
            </li>
            <li className="mx-2 mt-1 truncate text-xs leading-5 font-semibold bg-green-900 text-[24px]  border-2 w-6/12">
              Country Region: {data.region}
            </li>
            <li className="mx-2 mt-1 truncate text-xs leading-5 font-semibold bg-green-900 text-[24px] border-2 w-6/12">
              Country Area Size: {data.area}
            </li>
          </div>
        ))}
      </ul>
      
    </div>
  );
}
