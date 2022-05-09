import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import axios from '@/lib/axios'

const Legend = () => {

 // Route
 const router = useRouter();
 // Hooks

 const [iconList, setIconList] = useState([]);
 const url = async () => {
  await axios.get('/api/icons')
 .then(res => {
 
    setIconList(res.data.data);
  });
 }

 useEffect( () => {
  url();      
}, []) // Sans les crochets ça tourne en boucle


  return (
    <div id="legend" style={{ width: '100%', margin: '0', backgroundColor: '#fff' }}>
			{iconList.map((icon) => (
				<div key={icon.id}>
					<img src={`http://localhost:8000/api/image/${icon.image}`} alt="icône séisme"/>
					<p>{icon.name}</p>
				</div>
			))}
    </div>
  )
}

export default Legend