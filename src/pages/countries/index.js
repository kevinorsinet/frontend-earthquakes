import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

const Countries = () => {
   // Route
   const router = useRouter();

  // Hooks : useState, useEffect
  const [countries, setCountries] = useState([]);

  console.log("avant useEffect", countries);

  useEffect( () => {
    url();      
  }, []) 
  
  const url = async () => {
      await axios.get('/api/countries')
     .then(res => {
        // console.log("axios :", res.data);
        setCountries(res.data.data);
     });
  }

  // Supprimer un sport

  const deleteCountry = (countryID) => {
    console.log("l'id de l'icone deà supprimer est", countryID);
    axios
    .delete(`/api/countries/${countryID}`)
    .then(res => {
      url();
    })

  }

  return (
    <AppLayout
      header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Liste des pays
          </h2>
      }>

      {/* Titre de l'onglet */}
      <Head>
          <title>Liste des pays</title>
      </Head>

      {/*************************** Contenu ***************************/}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">

              <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Pays</h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {countries.map((country) => (
                      <div key={country.id} className="group relative">
                        <div className="w-full min-h-20 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                          {/* <img src={`http://localhost:8000/${icon.image}`} /> */}
													<img src={`http://localhost:8000/api/image/${country.flag}`} />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>


                            <h1 className="text-lg text-gray-700"><a href={`http://localhost:3000/icons/show/${country.id}`}>{country.name}</a>
                               
                            </h1>
                            <h1>Risque {`${country.risk}`}</h1>


                            {(country.risk == true)
                              ? <img width="50px" src={`/riskTrue.png`} />
                              : <img width="50px" src={`/riskFalse.png`} />
                            }

                            
                            <p className="mt-1 text-sm text-gray-500">
                            <a href={`http://localhost:3000/country/edit/${country.id}`}>Modifier pays</a>
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                            <button onClick={ 
                              () => {
                                  deleteCountry(country.id)
                              }
                            }
                            >
                              Supprimer le pays</button>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  </AppLayout>
  )
}

export default Countries