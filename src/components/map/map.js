import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { DragabbleMarker } from '../marker/marker'
import { AlertDialog as Dialog } from '../dialog/dialog'
import { MapContainer } from 'react-leaflet'
import { TileLayer, Polyline} from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export const Map = () => {
    const center = [54.8540168, 83.1018485] 
    const [drag, setDrag] = useState(false)   
    const [startAccept, setStartAccept] = useState(false)
    const [endAccept, setEndAccept] = useState(false)
    const [dialog, showDialog] = useState(false)
    const [firstMarker, setFirstPoint] = useState(center)
    const [secondMarker, setSecondPoint] = useState(center)
    const [data, setData] = useState(false)

    const isFirst = useRef(true)
    const getPath = () => {
        axios.post('http://localhost:8080/getpath', {
            start: firstMarker,
            end: secondMarker
          })
          .then(res => {
            setData(res.data)
            console.log(data)
          })
          .catch(error => {
            console.log(error);
          });
    }
    useEffect(() => {
        const ref = isFirst.current
        const timeout = setTimeout(() => {
            if (!drag && !ref) showDialog(true)
        }, 2000);
     
        isFirst.current = false
        return () => clearTimeout(timeout);        
       },
       [drag]);
       
    useEffect(() => {
        if (startAccept && endAccept) {
            getPath() 
        }
    },[startAccept, endAccept])   

    return <>
        <MapContainer style = {{width: '100%', height: '100vh'}} center={center} zoom={14} scrollWheelZoom={true}>
            { data &&
                <Polyline
                    key={true}
                    attribution='&copy;'
                    color='blue'
                    positions={data}
                />
            }
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DragabbleMarker center={firstMarker} setCoord={setFirstPoint} draggable={!startAccept} point={'start'} drag={drag} setDrag={setDrag}/>
            { !startAccept && dialog && <Dialog open={true} point={'start'} showDialog={showDialog} setAccept={setStartAccept}></Dialog> }

            { startAccept && <DragabbleMarker center={secondMarker} setCoord={setSecondPoint} draggable={!endAccept} point={'end'} drag={drag} setDrag={setDrag}/> }
            { startAccept && dialog && <Dialog open={true} point={'end'} showDialog={showDialog} setAccept={setEndAccept}></Dialog> }
        </MapContainer>
    </>
}

export default Map