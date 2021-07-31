import { useEffect, useState } from "react"
import SimpleMap from './SimpleMap'

const Geolocator = props => { 
    
    const [location, setLocation] = useState({}) //{ lat: 51.501364, lng: -0.141890 })

    // geolocator location
    const success = position => {
        const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setLocation(coordinates)
    }

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(success)
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success)
                    }
            });
        }
    },[])

    return (
        <div>
            <div className="text-center py-4">
                <h3>
                  My Current location: Lat: {location.lat}, Lng: {location.lng}
                </h3>
            </div>
            <div  style={{ height: '100vh', width: '100%' }}>
                {/* <SimpleMap center={location} locations={[]} /> */}
            </div>
        </div>
    )
}

export default Geolocator;