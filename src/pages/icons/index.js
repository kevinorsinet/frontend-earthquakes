import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

const Icons = () => {
   // Route
   const router = useRouter();

  // Hooks : useState, useEffect
  const [icons, setIcons] = useState([]);

  console.log("avant useEffect", icons);

  useEffect( () => {
    url();      
  }, []) // Sans les crochets ça tourne en boucle
  
  const url = async () => {
      await axios.get('/api/icons')
     .then(res => {
        // console.log("axios :", res.data);
        setIcons(res.data.data);
     });
  }

  // Supprimer un sport

  const deleteIcon = (iconID) => {
    console.log("l'id de l'icone deà supprimer est", iconID);
    axios
    .delete(`/api/icons/${iconID}`)
    .then(res => {
      url();
    })

  }

  return (
    <AppLayout
      header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Liste des icônes
          </h2>
      }>

      {/* Titre de l'onglet */}
      <Head>
          <title>Liste des  icônes</title>
      </Head>

      {/*************************** Contenu ***************************/}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">

              <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Icônes</h2>

                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {icons.map((icon) => (
                      <div key={icon.id} className="group relative">
                        <div className="w-full min-h-20 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                          {/* <img src={`http://localhost:8000/${icon.image}`} /> */}
													<img src={`http://localhost:8000/api/image/${icon.image}`} />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            {/* <div>
                              <h1 className="text-sm text-gray-700">
                                  Article publié le: {post.created_at}
                              </h1>
                            </div> */}
                            {/* <div>
                              <h1 className="text-sm text-gray-700">
                                  Catégorie
                              </h1>
                            </div> */}

                            <h1 className="text-lg text-gray-700"><a href={`http://localhost:3000/icons/show/${icon.id}`}>{icon.name}</a>
                               
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                            <a href={`http://localhost:3000/icons/edit/${icon.id}`}>Editer</a>
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                            <button onClick={ 
                              () => {
                                  deleteIcon(icon.id)
                              }
                            }
                            >
                              Supprimer l'icône</button>
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

export default Icons