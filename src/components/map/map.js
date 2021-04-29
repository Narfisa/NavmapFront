import { DragabbleMarker } from '../marker/marker'
import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

export const Map = () => {
    const center = [54.8540168, 83.1018485]

    return <>
        <MapContainer style = {{width: '100%', height: '100vh'}} center={center} zoom={14} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DragabbleMarker center={center} draggable={true} point={'start'} />
        </MapContainer>
    </>
}

export default Map