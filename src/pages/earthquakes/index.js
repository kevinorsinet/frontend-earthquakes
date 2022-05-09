import dynamic from "next/dynamic";
import { useEffect, useState } from "react"
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import Legend from '@/components/Legend'


  const Map = dynamic(() => {
    return import("../../components/Map")
  },
    {
      ssr: false
    }
  );

  const MapEarthquakes = () => {
      // Route
      
      const router = useRouter();
      // Hooks
          const [earthquakesList, setEarthquakesList] = useState([]);
          console.log("earthquakesList index",earthquakesList);
      // Recherche 

      return (
          <AppLayout
              header={
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                      Recherche
                  </h2>
              }>
  
              <Head>
                  <title>Laravel - Recherche</title>
              </Head>
  
          <div className="flex flex-col">
              <div className="py-12">
                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                          <div className="px-2 py-6 md:px-6 py-6 bg-white border-b border-gray-200">

                                  <div style={{ width: '80%', height: '600px', margin: '0 auto'}}>
                                  {/* HTML 👇 */}
                                  <Legend />
                                  <Map />
                                  
                                  </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </AppLayout>
      )
  }
  
  export default MapEarthquakes
