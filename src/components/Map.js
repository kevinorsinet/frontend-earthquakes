import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import axios from '@/lib/axios'

import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet'
import L from "leaflet";
import Fuse from "fuse.js"


const like = L.icon({
  iconSize: [60, 60],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  shadowSize: [100, 30], // size of the shadow
  shadowAnchor: [15, 10],
  //iconUrl: "https://img2.freepng.fr/20180320/etw/kisspng-pile-of-poo-emoji-feces-t-shirt-sticker-poop-png-emoji-island-5ab1c1e2792d65.3033429615215989464964.jpg",

  iconUrl: "https://img2.freepng.fr/20180320/etw/kisspng-pile-of-poo-emoji-feces-t-shirt-sticker-poop-png-emoji-island-5ab1c1e2792d65.3033429615215989464964.jpg",

  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const Map = () => {

 // Route
 const router = useRouter();
 // Hooks
 const [earthquakesList, setEarthquakesList] = useState([]);
 const [iconList, setIconList] = useState([]);
 const [result, setResult] = useState([]);

 let iconMineure1;
 let iconMineure2;
 let iconLegere;
 let iconModeree;
 let iconForte;
 
 
 // const url = async () => {
   //   await axios.get('/api/icons')
   //   .then(res => {
     //   //  console.log("axios :", res.data.data);
     //     iconMineure1 = res.data.data[0].image;
     //     iconMineure2 = res.data.data[1].image;
     //     iconLegere = res.data.data[2].image;
     //     iconModeree = res.data.data[3].image;
     //     iconForte = res.data.data[4].image;
     //     // setIconList(res.data.data);
     //   });
     // }
  // Sans les crochets ça tourne en boucle
  
const api = async()=> {
  const res = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2022-04-03&endtime=2022-04-04`)
  const data = await res.json();

  const icones = await axios.get('/api/icons')
    .then(res => {
    //  console.log("axios :", res.data.data);
      iconMineure1 = res.data.data[0].image;
      iconMineure2 = res.data.data[1].image;
      iconLegere = res.data.data[2].image;
      iconModeree = res.data.data[3].image;
      iconForte = res.data.data[4].image;
      // setIconList(res.data.data);
      // console.log("icones:", iconForte);
  });
  // console.log(data);
  // Mettre à jour le state de la variable earthquakes
  setEarthquakesList(
    data.features.map( (earthquake) => {
      if (earthquake.properties.mag <= 2.9 ) {

        return {...earthquake, coordinates: [Number(`${earthquake.geometry.coordinates[0]}`), Number(`${earthquake.geometry.coordinates[1]}`)],
                               icon: `http://localhost:8000/api/image/${iconMineure1}`  
        }
      } else if (earthquake.properties.mag > 2.9 && earthquake.properties.mag <= 3.9) {
        return {...earthquake, coordinates: [Number(`${earthquake.geometry.coordinates[0]}`), Number(`${earthquake.geometry.coordinates[1]}`)],
                               icon: `http://localhost:8000/api/image/${iconMineure2}` 
        }
      } else if (earthquake.properties.mag > 3.9 && earthquake.properties.mag <= 4.9) {
        return {...earthquake, coordinates: [Number(`${earthquake.geometry.coordinates[0]}`), Number(`${earthquake.geometry.coordinates[1]}`)],
                               icon: `http://localhost:8000/api/image/${iconLegere}` 
        }
      }  else if (earthquake.properties.mag > 4.9 && earthquake.properties.mag <= 5.9) {
        return {...earthquake, coordinates: [Number(`${earthquake.geometry.coordinates[0]}`), Number(`${earthquake.geometry.coordinates[1]}`)],
                               icon: `http://localhost:8000/api/image/${iconModeree}`  
        }
      } else {
        
        return {...earthquake, coordinates: [Number(`${earthquake.geometry.coordinates[0]}`), Number(`${earthquake.geometry.coordinates[1]}`)],
                               icon: `http://localhost:8000/api/image/${iconForte}`
        }
      }

    })
    )
}

// console.log("iconList", iconList);

useEffect(()=> {
  api()
  setResult(earthquakesList)
},
[]  // UseEffect se déclenche dès que earthquake liste change, qd il est vide, il se déclenche une fois, si on ne mets pas de crochet, elle se déclenche à l infini
)
console.log("earthquakesList",earthquakesList);

const options = {
  includeScore: false,
  threshold: 0.4,
  // Search in `author` and in `tags` array
  keys: ['properties.place']
}

const fuse = new Fuse(earthquakesList, options)
// const result = fuse.search('Bodfish');
let toto  = null;

// if (toto.length) {
//   console.log();
// } else {

// }
  return (
    <>
    <form>
        <div className="mt-4">
            <Label htmlFor="name">
                Recherche
            </Label>
            <Input
                id="searchbox"
                name="name"
                type="text"
                onChange = {
                    event => {
                      setResult(fuse.search(event.target.value));
                    }
                }
                className="mt-1 block w-full"
                required
            />
        </div>
        {/* <div className="flex items-center justify-end mt-4">
            <Button className="ml-4">Rechercher</Button>
        </div> */}
    </form>
    <div id="map" style={{ width: '100%', height: '600px', margin: '0', backgroundColor: '#fff' }}>

      <MapContainer
        center={[46.6681699, -1.4148661]}
        zoom={1}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        >
        <TileLayer
          url={"https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnVudGhlYXIiLCJhIjoiY2tkYTdnOHpmMGI3NDJxbXpoc2QwMXc3MyJ9.nu-giQ821MNuH64prgx2yg"}
          attribution='Tremblements de terre du 03 au 04 avril'
          />

        {

          result.map(
            (item, index) => { 
              console.log("result.map", result);
              console.log("icone", item.icone);
              const icone = L.icon({
                iconSize: [20, 20],
                setRadius: 10,
                iconAnchor: [10, 41],
                popupAnchor: [2, -40],
                shadowSize: [30, 10], // size of the shadow
                shadowAnchor: [15, 10],  // the same for the shadow
                iconUrl: `${item.icon}`,
                shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
              });
              return (
                <Marker key={index} position={[item.item.coordinates[1], item.item.coordinates[0]]} draggable={false} animate={true} icon={icone}>
                  <Popup>{item.item.properties.place} - Magnitude {item.item.properties.mag}</Popup>
                  
                </Marker>
              )
            }
          )
        }

      </MapContainer>
    </div >
    </>
  )

}

export default Map