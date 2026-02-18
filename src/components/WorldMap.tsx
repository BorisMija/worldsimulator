import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import { Country } from '../models/Country';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/WorldMap.css';

// Fix pentru marker default icon în React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface WorldMapProps {
  countries: Country[];
  selectedCountry: Country | null;
  onCountryClick: (country: Country) => void;
}

export function WorldMap({ countries, selectedCountry, onCountryClick }: WorldMapProps) {
  return (
    <MapContainer 
      center={[20, 0]} 
      zoom={3} 
      style={{ height: '600px', width: '100%' }}
      className="world-map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
        maxZoom={19}
      />

      {countries.map((country) => {
        const isSelected = selectedCountry?.code === country.code;
        const [lat, lng] = country.latlng;
        
        // Color based on military power
        const militaryColor = country.militaryPower > 70 ? '#ff4444' : 
                             country.militaryPower > 40 ? '#ffaa44' : '#44ff44';
        
        // Size based on economic power
        const markerSize = 8 + (country.economicPower / 100) * 12;

        return (
          <CircleMarker
            key={country.code}
            center={[lat, lng]}
            radius={markerSize}
            fillColor={isSelected ? '#0066ff' : militaryColor}
            fillOpacity={0.8}
            color={isSelected ? '#0033aa' : '#333'}
            weight={isSelected ? 3 : 1}
            eventHandlers={{
              click: () => onCountryClick(country),
            }}
            className={isSelected ? 'marker-selected' : 'marker-country'}
          >
            <Popup>
              <div className="country-popup">
                <h4>{country.name}</h4>
                <div className="country-stats">
                  <p><strong>Code:</strong> {country.code}</p>
                  <p><strong>Capital:</strong> {country.capital}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Population:</strong> {(country.population / 1000000).toFixed(1)}M</p>
                </div>
                <div className="country-power">
                  <p>🎖️ Military: <strong>{country.militaryPower}</strong>/100</p>
                  <p>💰 Economic: <strong>{country.economicPower}</strong>/100</p>
                </div>
                <button 
                  className="btn-map-select"
                  onClick={() => onCountryClick(country)}
                >
                  📍 Select
                </button>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
