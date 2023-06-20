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

  function filterCountries(countries: Country[], criteria: CountryCriteria): Country[] {
    const filteredCountries = countries.filter((country) => {
      if (country < 65300.0 ) {
    
     }
    }
    )}
  
   return (
    <div>
    
    </div>
  )
}


