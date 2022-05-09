import { useEffect, useState } from "react"
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import 'style/style.css';
//  Map 
import dynamic from "next/dynamic";

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

		useEffect( () => {
			(async () => {
				const res = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2022-03-27&endtime=2022-03-28`);
				const earthquakesList = await res.json();
				setEarthquakesList(earthquakesList.features);
				console.log("data", earthquakesList.features);

				// setEarthquakesList(
				// 		earthquakesList.features.map( (earthquake) => {
				//     	return {...earthquake, coordinates: [Number(`${earthquake.geometry.coordinates[0]}`), Number(`${earthquake.geometry.coordinates[1]}`)] }

				// 		})
				// )

		
			}, [])
		})

    // Recherche 
    const submitForm = async (event) => {
			event.preventDefault(); // Je contrôle ma requête

			const search= async () => {

			}
			search();
	};

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
                            <form onSubmit={submitForm}>
                                <div className="mt-4">
                                    <Label htmlFor="name">
                                        Recherche
                                    </Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        onChange = {
                                            event => {
                                                // setName(event.target.value);
                                            }
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4">Rechercher</Button>
                                </div>
                            </form>
														<div style={{ width: '80%', height: '600px', margin: '0 auto'}}>
														{/* HTML 👇 */}

													<Map />
														
														</div>
														{/* <ol>
														{ earthquakesList.map((earthquake, index) => {
																	return (
																			<li key={index}>{
																				earthquake.properties.place}
												
																					</li>
																	)

															})
														}
														</ol> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AppLayout>
    )
}

export default MapEarthquakes