import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InspectionMapProps {
  address: string;
  borough: string;
}

const InspectionMap: React.FC<InspectionMapProps> = ({ address, borough }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Manhattan
    map.current = L.map(mapContainer.current, {
      center: [40.8518, -73.9343], // Approximate coordinates for 515 West 185 Street
      zoom: 15,
      zoomControl: true,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Custom marker icon
    const customIcon = L.divIcon({
      html: `
        <div style="
          background-color: hsl(210 100% 48%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      className: 'custom-marker',
    });

    // Add marker
    const marker = L.marker([40.8518, -73.9343], { icon: customIcon })
      .addTo(map.current)
      .bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif;">
          <strong>${address}</strong><br>
          ${borough}<br>
          <span style="color: #666; font-size: 12px;">Localização do Prédio</span>
        </div>
      `);

    // Open popup by default
    marker.openPopup();

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [address, borough]);

  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg border border-border">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default InspectionMap;