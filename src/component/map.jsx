import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countryData from "../countries";
import "leaflet/dist/leaflet.css";
import Conutry from "./Country";



const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [position, setPosition] = useState([20.5937, 78.9629]);

  const getData = async (country_ISO) => {
    try {
      let res = await fetch(
        `https://restcountries.com/v3.1/alpha/${
          country_ISO ? country_ISO : "IND"
        }`
      );
      const data = await res.json();
      setSelectedCountry(...data);
      setPosition(data[0].capitalInfo.latlng);
    } catch (err) {
      console.log("error", err);
    }
  };


  useEffect(() => {
    getData();
  }, []);


  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);
    layer.on("click", function (e) {
      getData(e.target.feature.properties.ISO_A3);
    });
  };

  return (
    <div className="map">
     
      <MapContainer
        style={{ height: "90vh", width: "70vw" }}
        zoom={3}
        center={position}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          style={{ color: "#3388ff", weight: 0.5 }}
          data={countryData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
      {selectedCountry && <Conutry selectedCountry={selectedCountry} />}
    </div>
  );
};

export default WorldMap;
