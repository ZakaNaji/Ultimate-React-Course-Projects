import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlLocation } from "../hooks/useUrlLocation";

export default function Map() {
  const navigate = useNavigate();

  const cities = useCities().cities;
  const [position, setPosition] = useState([51.505, -0.09]);
  const {
    isLoading,
    error,
    position: geolocation,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlLocation();

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geolocation) {
      setPosition([geolocation.lat, geolocation.lng]);
    }
  }, [geolocation]);

  return (
    <div className={styles.mapContainer}>
      {!geolocation && (
        <Button onClick={getPosition} type="position">
          {isLoading ? "Loading..." : "Get Position"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick navigat={navigate} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({ navigat }) {
  useMapEvents({
    click: (e) => {
      navigat(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
