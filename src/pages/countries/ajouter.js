import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import {useState} from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

const Ajouter = () => {
    // Route
    const router = useRouter();

    // Hooks
    const [name, setName] = useState();
    const [flag, setFlag] = useState();
	const [risk, setRisk] = useState();

    const handleOnChange = (e) => {
        // setRisk(!risk);
        console.log("evenement", e.target.checked);
        setRisk(e.target.checked);

        if (e.target.checked == true) {
            setRisk(1);
        } else {
            setRisk(0);
        }
    };

    // Méthode POST
    const submitForm = async (event) => {
        event.preventDefault(); // Je contrôle ma requête
        const form = document.getElementById('addCountry');
        var data = new FormData(form);
        const ajouterPays= async () => {

            await axios
                .post('/api/countries', data, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(res => {
                    router.push('/countries')
                })
                .catch(error => {
                    setErrors(error)
                    if (error.response.status !== 409) throw error
                })
        }
        ajouterPays();
    };


    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ajouter un pays
                </h2>
            }>

            <Head>
                <title>Laravel - Ajout de pays</title>
            </Head>

        <div className="flex flex-col">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-2 py-6 md:px-6 py-6 bg-white border-b border-gray-200">
                            <form onSubmit={submitForm} id="addCountry">
                                <div className="mt-4">
                                    <Label htmlFor="name">
                                        Nom du pays
                                    </Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        onChange = {
                                            event => {
                                                setName(event.target.value);
                                            }
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="flag">
                                        Drapeau
                                    </Label>
                                    <Input
                                        name="flag"
                                        type="file"
                                        onChange = {
                                            event => {
                                                setFlag(event.target.files[0]);
                                                // console.log("event", event.target.files[0]);
                                            }
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
								<div className="mt-4">
                                    <Label htmlFor="risk">
                                        Risque
                                    </Label>
                                    
                                    <input
                                        name="risk"
										type="checkbox"
                                        value={risk}
                                        onChange={handleOnChange}
                                        // onChange = {
                                        //     event => {
                                        //         setRisk(event.target.value);
                                        //     }
                                        // }
                                    
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4">Ajouter le pays</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AppLayout>
    )
}

export default Ajouter