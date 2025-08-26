import { useRef, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import L from 'leaflet';

import testing from '../../../utils/js/testing.json';
import batas_kab from '../../../utils/js/BATAS_KAB_BIG_2021.json';


const DashboardPage = () => {
  const[bencana] = useState<any>(testing)
  const[batasKab] = useState<any>(batas_kab)

  const geo = useRef(null);

  const MarkerPetaCore = new Icon({
    iconUrl: 'https://backendreboon.api.pusdalops-bpbdsulteng.com/images/location1.png',
    iconSize: [20, 20],
  });


  return (
    <div className="lg:flex lg:flex-col lg:gap-x-5">
      <div className="relative">
        <section>
          <div className="mb-5 rounded-xl border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">
            <MapContainer
              center={[-2.302814, 121.818022]}
              zoom={7}
              scrollWheelZoom={false}
              className="max-w-full h-[700px]"
            >
              <TileLayer
                attribution="Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
                className="basemap"
                maxNativeZoom={19}
                maxZoom={19}
                subdomains={['clarity']}
                url="https://{s}.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />

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

          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
