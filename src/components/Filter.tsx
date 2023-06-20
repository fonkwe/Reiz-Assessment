import React, { useEffect } from 'react'

interface CountryCriteria {
  name?: string;
  region?: string;
  area?: number;
}

interface Country {
  name: string;
  region: string;
  area: number;
}


export default function Filter() {  

  function filterCountriesByArea(countries: Country[], criteria: CountryCriteria): Country[] {
    const filteredCountries = countries.filter((country) => {
      if (!country.hasOwnProperty("area") || country.area === undefined) {
        return false;
      }
      const lithuaniaArea = 65300;
      return country.area < lithuaniaArea;
    });
    return filteredCountries;
  }
  
   return (
    <div>
       <button
          className="p-2 ml-5 mx-auto bg-green-400 text-black font-bold border border-green-700 rounded"
          onClick={() => {}}
        >
          Filter
        </button>
    
    </div>
  )
}


