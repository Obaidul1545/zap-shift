import React, { useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const position = [23.7104, 90.4074];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="my-20">
      <h2 className="text-3xl text-center font-semibold mb-5">
        We are available in 64 districts
      </h2>
      <div className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSearch}>
          <div className="flex items-center bg-[#F3F6F9] rounded-full overflow-hidden shadow-sm">
            {/* Input Field */}

            <div className="flex items-center px-4 flex-1">
              <FiSearch className="text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search here"
                name="location"
                className="w-full px-3 py-3 bg-transparent focus:outline-none text-gray-700"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-[#D3EC46] text-black font-medium px-8 py-3 rounded-r-full hover:bg-[#c4df35] transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <section className="my-10">
        <h2 className="text-2xl"> We deliver almost all over Bangladesh</h2>

        <div className="border w-full h-[800px]">
          <MapContainer
            className="h-full"
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenters.map((center) => (
              <Marker position={[center.latitude, center.longitude]}>
                <Popup>
                  {center.district} <br />
                  Service Area: {center.covered_area.join(', ')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Coverage;
