import { useState, useRef, useMemo} from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


export const DragabbleMarker = (props) => {    
    const [position, setPosition] = useState(props.center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
  
    return (
      <Marker
        draggable={props.draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        >
        {props.draggable && <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
            Выберите точку {props.point==='start' ? 'отправления' : 'назначения'} передвигая маркер
        </Tooltip> }
      </Marker>
    )
}

export default DragabbleMarker;