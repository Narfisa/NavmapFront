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
    const string = 'Выберите точку ' + (props.point ==='start' ? 'отправления' : 'назначения') + ' передвигая маркер'
    const [position, setPosition] = useState(props.center)
    const setDrag = props.setDrag
    const [isDrag, setIsDrag] = useState(props.drag)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            props.setCoord(marker.getLatLng())
            setDrag(false)
            setIsDrag(false)
          }
        },
        dragstart() {
            const marker = markerRef.current
            if (marker != null) {
              setDrag(true)
              setIsDrag(true)
            }
        },
      }),
      [position], //change to position?
    )
  
    return (
      <Marker
        draggable={props.draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        >
        {!isDrag && <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
            {string}
        </Tooltip> }
      </Marker>
    )
}

export default DragabbleMarker;