import React, { useEffect, useState } from "react";
import Button from "./Button";

export interface CountryData {
  name: string;
  region: string;
  area: number;
  independent: boolean;
}

let results: CountryData[];

export default function ListOfCountries({ name, region, area }: CountryData) {
  // useStates to handle the different states
  const [data, setData] = useState([]) as any;
  const [dataCopy, setDataCopy] = useState([]) as any;
  const [paginatedData, setPaginatedData] = useState([]);
  const [error, setError] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState(false);
  const [results, setResults] = useState([]);

  // Fetching data from the API
  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setDataCopy(json);
      })
      .catch((err) => setError(err));
  }, []);

  // Paginating result by setting limits of results on each page
  const paginate = (dataInput: any, page: number, limit: number) => {
    const paginatedResult = dataInput.slice((page - 1) * limit, page * limit);
    setPaginatedData(paginatedResult);
    setTotalPages(Math.ceil(dataInput.length / limit));

    console.log("DATA TO BE PAGINATED: ", data);
    console.log("total pages: ", totalPages);
  };

  useEffect(() => {
    paginate(dataCopy, page, 10);
  }, [page]);

  useEffect(() => {
    //Filter Function to filter according to Requirement
    function filterCountries() {
      const filteredCountries = dataCopy.filter((country: any) => {
        const lithuaniaArea = data.find(
          (country: any) => country?.name === "Lithuania"
        ).area;
        console.log("lithuania area: ", lithuaniaArea);
        return country?.region === "Oceania" && country?.area < lithuaniaArea;
      });
      console.log("filtered countries: ", filteredCountries);
      setDataCopy(filteredCountries);
      setPage(1);
      paginate(filteredCountries, page, 10);
    }

    //Reset Filter back to non-filter state
    function removeFilter() {
      setDataCopy(data);
      setPage(1);
      paginate(dataCopy, page, 10);
    }

    if (filter) {
      filterCountries();
    } else {
      removeFilter();
    }
  }, [filter]);

  return (
    <div className="w-[100%] mx-auto">
      <ul className="mt-10">
        <div className="flex justify-between">
          <div className="p-2">
            <Button
              onClick={() => {
                page !== 1 && setPage(page - 1);
              }}
              title={"Previous Page"}
            />
            <Button
              onClick={() => {
                page !== totalPages && setPage(page + 1);
              }}
              title={"Next Page"}
            />
          </div>
          <div className="w-[15%] ">
            {/* <Button onClick={filterCountries} title={"Filter Countries"} /> */}
            <label>
              <input type="checkbox" onClick={() => setFilter(!filter)} />
              <span> Filter Countries</span>
            </label>
          </div>
        </div>
        {paginatedData?.sort().map((data: CountryData, idex) => (
          <div className="w-[95%] border-2 bg-green-300 pt-1 pb-2 mb-5 p-2">
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
