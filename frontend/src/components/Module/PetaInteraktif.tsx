/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import CardTotalKejadianMobile from '../../components/Module/CardTotalKejadianMobile';
import 'leaflet/dist/leaflet.css';
import * as api from '../../utils/Api';
import { Icon } from 'leaflet';
import L from 'leaflet';

import testing from '../../utils/js/testing.json';
import batas_kab from '../../utils/js/BATAS_KAB_BIG_2021.json';

import CardTotalKejadian from './CardTotalKejadian';

export default function PetaInteraktif() {
  const [totalKejadian, setTotalKejadian] = useState();
  const[bencana] = useState<any>(testing)
  const[batasKab] = useState<any>(batas_kab)

  const geo = useRef(null);

  useEffect(() => {
    const JenisKejadian = async () => {
      const response = await api.fetchKejadianPerJenis();
      setTotalKejadian(response?.data?.total);
    };
    JenisKejadian();
  }, []);

  const MarkerPetaCore = new Icon({
    iconUrl: 'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/location1.png',
    iconSize: [20, 20],
  });

  return (
    <section>
      <div className="mb-5 rounded-xl border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">
        <MapContainer
          center={[-1.645478, 124.167148]}
          zoom={7}
          scrollWheelZoom={false}
          className="max-w-full h-[600px]"
        >
          <TileLayer
            attribution="Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
            className="basemap"
            maxNativeZoom={19}
            maxZoom={19}
            subdomains={['clarity']}
            url="https://{s}.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          {/* <div
            style={{
              position: 'absolute',
              width: '33%',
              height: '45%',
              bottom: 30,
              right: 10,
              border: '2px solid #FBCC00',
            }}
          >
            <MapContainer
              style={{
                width: '100%',
                height: '100%',
              }}
              center={[-1.160899, 122.082408]}
              zoom={4}
              zoomControl={true}
              scrollWheelZoom={false}
              dragging={true}
              touchZoom={true}
              doubleClickZoom={false}
              boxZoom={true}
              keyboard={true}
            >
              <TileLayer
                attribution="Esri, DigitalGlobe, Geographics, Map Dark (Peta Gelap)"
                url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
              />
              <Marker icon={MarkerPetaDark} position={[-0.9072, 119.8764]}>
                <Popup>Kota Palu, Sulawesi Tengah</Popup>
              </Marker>
            </MapContainer>
          </div> */}

          <LayersControl position="bottomleft">
            <LayersControl.Overlay name="Titik Lokasi Bencana Tahun 2025">
              <GeoJSON
                data={bencana}
                ref={geo}
                pointToLayer={function (_geoJsonPoint, latlng) {
                  return L.marker(latlng, {
                    icon: MarkerPetaCore,
                    riseOnHover: true,
                  });
                }}
                onEachFeature={function (feature, layer) {
                  layer.bindPopup(`
                  <div className='bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark w-full'>
                    <ul>
                      <li>
                        Kejadian : ${feature?.properties?.kejadian}
                      </li>
                      <li>
                        Lokasi : Desa ${feature?.properties?.lokasi}
                      </li>
                    </ul>
                  </div>
                  `);
                }}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Batas Kabupaten">
              <GeoJSON
                data={batasKab}
                ref={geo}
                pathOptions={{
                  color: '#FECF40',
                  fillColor: '#FBF4E2',
                  fillOpacity: 0.7,
                  opacity: 1,
                  weight: 1,
                }}
                filter={function (geoJsonFeature: { properties: { WADMPR: string } }) {
                  return geoJsonFeature.properties.WADMPR == 'Sulawesi Tengah';
                }}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(
                    `<span>${feature?.properties?.WADMKK}</span>`,
                  );
                  layer.on({
                    mouseover: function (e) {
                      const auxLayer = e.target;
                      auxLayer.setStyle({
                        weight: 4,
                        color: '#DBA500',
                      });
                    },
                    mouseout: function (e) {
                      const auxLayer = e.target;
                      auxLayer.setStyle({
                        weight: 1,
                        color: '#FECF40',
                        fillColor: '#FBF4E2',
                        dashArray: '',
                        fillOpacity: 0.7,
                        opacity: 1,
                      });
                    },
                  });
                }}
              />
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
        <div className="absolute top-10 right-10 z-999 sm:hidden w-1/4">
          <CardTotalKejadianMobile totalKejadian={totalKejadian} />
        </div>
        <div className="absolute top-10 right-10 z-999 hidden lg:w-1/3 sm:block sm:w-1/2">
          <CardTotalKejadian totalKejadian={totalKejadian} />
          <iframe
            className="w-full h-70 rounded-md mt-4"
            src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-239.15,0.87,2675"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
