import Header from '../src/components/Header'
import ListOfCountries from '../src/components/ListOfCountries';


export default function Home() {
 
  return (
    <>
      <div className="bg-green-100 mx-auto">
        <Header />
        <ListOfCountries name={''} region={""} area={0} independent={false} />
      </div>
    </>
  )
}
