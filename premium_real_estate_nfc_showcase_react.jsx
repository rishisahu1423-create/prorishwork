import React, { useEffect, useState } from 'react';

export default function LuxuryEstatePlatform() {
  // ==========================
  // BEGINNER DATABASE (LOCAL STORAGE)
  // ==========================
  const defaultProperties = [
    {
      id: 1,
      title: 'Imperial Sky Villa',
      location: 'Civil Lines, Kanpur',
      price: '₹3.5 Cr',
      type: '5 BHK Luxury Villa',
      area: '5200 Sq.ft',
      image:
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1400&auto=format&fit=crop',
      panorama:
        'https://pannellum.org/images/alma.jpg',
      description:
        'Ultra premium smart villa with luxury interiors, imported marble, private terrace, and premium security.',
      amenities: 'Infinity Pool, Smart Home, Private Parking, Security'
    }
  ];

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = '1234';

  const [properties, setProperties] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPanorama, setSelectedPanorama] = useState('');

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: '',
    area: '',
    image: '',
    panorama: '',
    description: '',
    amenities: ''
  });

  // ==========================
  // LOAD DATA
  // ==========================
  useEffect(() => {
    const stored = localStorage.getItem('luxury-properties');

    if (stored) {
      setProperties(JSON.parse(stored));
    } else {
      localStorage.setItem(
        'luxury-properties',
        JSON.stringify(defaultProperties)
      );
      setProperties(defaultProperties);
    }
  }, []);

  // ==========================
  // SAVE DATA
  // ==========================
  const saveProperties = (newProperties) => {
    setProperties(newProperties);
    localStorage.setItem(
      'luxury-properties',
      JSON.stringify(newProperties)
    );
  };

  // ==========================
  // ADMIN LOGIN
  // ==========================
  const handleLogin = () => {
    if (
      loginData.username === ADMIN_USERNAME &&
      loginData.password === ADMIN_PASSWORD
    ) {
      setIsAdmin(true);
      alert('Admin Login Successful');
    } else {
      alert('Wrong Username or Password');
    }
  };

  // ==========================
  // ADD PROPERTY
  // ==========================
  const addProperty = () => {
    if (!formData.title || !formData.image) {
      alert('Please fill required fields');
      return;
    }

    const newProperty = {
      id: Date.now(),
      ...formData
    };

    const updated = [...properties, newProperty];
    saveProperties(updated);

    setFormData({
      title: '',
      location: '',
      price: '',
      type: '',
      area: '',
      image: '',
      panorama: '',
      description: '',
      amenities: ''
    });

    alert('Property Added Successfully');
  };

  // ==========================
  // DELETE PROPERTY
  // ==========================
  const deleteProperty = (id) => {
    const updated = properties.filter((p) => p.id !== id);
    saveProperties(updated);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-[0.3em] text-yellow-400 uppercase">
              Imperial Estates
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider text-gray-300">
            <a href="#properties" className="hover:text-yellow-400 transition">
              Properties
            </a>
            <a href="#tour" className="hover:text-yellow-400 transition">
              360 Tour
            </a>
            <a href="#admin" className="hover:text-yellow-400 transition">
              Admin
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden text-center px-6">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-5xl">
          <div className="inline-block px-6 py-3 rounded-full border border-yellow-500/30 bg-black/40 backdrop-blur-2xl mb-8 text-yellow-300 tracking-[0.25em] uppercase text-xs">
            NFC Powered Real Estate Platform
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mb-8">
            Luxury
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500">
              Property Experience
            </span>
          </h1>

          <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
            Explore luxury properties, immersive 360 tours, premium interiors,
            smart NFC experiences, and direct WhatsApp inquiries.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <button className="px-10 py-5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 text-black font-bold shadow-2xl hover:scale-105 transition-all">
              Explore Properties
            </button>

            <button className="px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-white/10 transition-all">
              Schedule Visit
            </button>
          </div>
        </div>
      </section>

      {/* ================= PROPERTY SECTION ================= */}
      <section id="properties" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <div className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
              Featured Listings
            </div>

            <h2 className="text-5xl md:text-7xl font-black">
              Premium
              <span className="block text-white/40">Properties</span>
            </h2>
          </div>

          <div className="grid gap-12">
            {properties.map((property) => (
              <div
                key={property.id}
                className="grid lg:grid-cols-2 gap-10 rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-3xl shadow-[0_0_80px_rgba(255,255,255,0.03)]"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden group">
                  <img
                    src={property.image}
                    className="w-full h-full object-cover min-h-[600px] group-hover:scale-110 transition-all duration-1000"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute top-8 left-8 px-5 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-2xl">
                    {property.price}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-10 flex flex-col justify-between">
                  <div>
                    <div className="text-yellow-400 uppercase tracking-[0.25em] text-xs mb-5">
                      Luxury Listing
                    </div>

                    <h3 className="text-5xl font-black leading-tight mb-5">
                      {property.title}
                    </h3>

                    <p className="text-gray-400 text-lg mb-8">
                      📍 {property.location}
                    </p>

                    <p className="text-gray-300 text-lg leading-relaxed mb-10">
                      {property.description}
                    </p>

                    {/* DETAILS */}
                    <div className="grid grid-cols-2 gap-5 mb-10">
                      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                        <div className="text-gray-400 text-sm uppercase mb-2">
                          Property Type
                        </div>
                        <div className="text-2xl font-bold">{property.type}</div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                        <div className="text-gray-400 text-sm uppercase mb-2">
                          Property Area
                        </div>
                        <div className="text-2xl font-bold">{property.area}</div>
                      </div>
                    </div>

                    {/* AMENITIES */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {property.amenities
                        .split(',')
                        .map((item, index) => (
                          <div
                            key={index}
                            className="px-5 py-3 rounded-full border border-white/10 bg-white/[0.04]"
                          >
                            {item}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setSelectedPanorama(property.panorama)}
                      className="px-8 py-5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 text-black font-bold hover:scale-105 transition-all"
                    >
                      Open 360 Tour
                    </button>

                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      className="px-8 py-5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-2xl hover:bg-white/10 transition-all"
                    >
                      WhatsApp Inquiry
                    </a>
                  </div>

                  {/* ADMIN DELETE */}
                  {isAdmin && (
                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="mt-6 px-6 py-4 rounded-full bg-red-600 hover:bg-red-700 transition-all"
                    >
                      Delete Property
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 360 VIEWER ================= */}
      <section id="tour" className="py-28 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
              Immersive Experience
            </div>

            <h2 className="text-5xl md:text-7xl font-black">
              360°
              <span className="block text-white/40">Property View</span>
            </h2>
          </div>

          <div className="rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.03] p-5 backdrop-blur-3xl shadow-[0_0_80px_rgba(255,255,255,0.03)]">
            {selectedPanorama ? (
              <iframe
                title="360-view"
                width="100%"
                height="700"
                allowFullScreen
                src={`https://cdn.pannellum.org/2.5/pannellum.htm#panorama=${selectedPanorama}`}
                className="rounded-[30px]"
              />
            ) : (
              <div className="h-[700px] flex items-center justify-center text-gray-400 text-2xl rounded-[30px] bg-black/40">
                Open a Property 360 Tour
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= ADMIN PANEL ================= */}
      <section id="admin" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
              Admin Dashboard
            </div>

            <h2 className="text-5xl md:text-7xl font-black">
              Property
              <span className="block text-white/40">Management</span>
            </h2>
          </div>

          {!isAdmin ? (
            <div className="rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-10 shadow-[0_0_80px_rgba(255,255,255,0.03)]">
              <div className="grid gap-6">
                <input
                  type="text"
                  placeholder="Admin Username"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      username: e.target.value
                    })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="password"
                  placeholder="Admin Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      password: e.target.value
                    })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <button
                  onClick={handleLogin}
                  className="px-8 py-5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 text-black font-bold hover:scale-105 transition-all"
                >
                  Admin Login
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-10 shadow-[0_0_80px_rgba(255,255,255,0.03)]">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Property Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="Property Type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="Property Area"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="Main Property Image URL"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="360 Panorama Image URL"
                  value={formData.panorama}
                  onChange={(e) =>
                    setFormData({ ...formData, panorama: e.target.value })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="Amenities (comma separated)"
                  value={formData.amenities}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: e.target.value
                    })
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 outline-none"
                />
              </div>

              <textarea
                placeholder="Property Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                }
                className="mt-6 w-full bg-black/40 border border-white/10 rounded-3xl p-6 outline-none min-h-[180px]"
              />

              <button
                onClick={addProperty}
                className="mt-8 px-10 py-5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 text-black font-bold hover:scale-105 transition-all"
              >
                Publish Property
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 uppercase tracking-[0.2em] text-sm">
        © 2026 Imperial Estates • Luxury NFC Real Estate Platform
      </footer>
    </div>
  );
}
