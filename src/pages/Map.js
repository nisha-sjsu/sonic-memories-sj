import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import geoJson from "../data/sanjose.json";
import NavigationBar from "../components/Navbar.js";
import "../styles/Map.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3JpbmlzaGFhIiwiYSI6ImNsbXR3NGQ4bzA3N28yam16MGg0bGp1enQifQ.7mW69uArYMj80DfaGEcApw";

  const Marker = ({ onClick, children, point }) => {
    const _onClick = () => {
      onClick(point.location);
    };
  
    return (
      <button onClick={_onClick} className="marker-button">
        <FontAwesomeIcon
          icon={faLocationDot}
          size="2xl"
          beat
          className="marker-icon"
        />
        {children}
      </button>
    );
  };

  const Map = () => {
    const mapContainerRef = useRef(null);
  
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/srinishaa/cln5dkus3005q01pwdaq4chpt",
        center: [-121.886, 37.338],
        zoom: 10,
      });
  
      geoJson.sanjose.forEach((point) => {
        const ref = React.createRef();
        ref.current = document.createElement("div");
        createRoot(ref.current).render(
          <Marker onClick={markerClicked} point={point} />
        );
  
        new mapboxgl.Marker(ref.current)
          .setLngLat([point.Longitude, point.Latitude])
          .addTo(map);
      });
  
      map.addControl(new mapboxgl.NavigationControl(), "top-right");
  
      return () => map.remove();
    }, []);
  
    const markerClicked = (title) => {
      window.alert(title);
    };
  
    return (
      <div>
        {/* NavigationBar on top */}
        <NavigationBar className="navbar"/>
  
        {/* Map container below the Navbar with grayscale filter */}
        <div className="map-container" ref={mapContainerRef} />
      </div>
    );
  };

export default Map;
