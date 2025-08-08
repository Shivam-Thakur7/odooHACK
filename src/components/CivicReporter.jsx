import { useEffect, useRef, useState } from 'react';

export default function CivicReporter() {
  const mapRef = useRef(null);
  const azureMapsKey = ''; // replace with your valid key
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [map, setMap] = useState(null);
  const [importance, setImportance] = useState('low');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const loadAzureMaps = async () => {
      if (!window.atlas) {
        const script = document.createElement('script');
        script.src = 'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js';
        script.async = true;
        document.head.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css';
        document.head.appendChild(link);

        script.onload = initMap;
      } else {
        initMap();
      }
    };

    const initMap = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const center = [position.coords.longitude, position.coords.latitude];
          const m = new window.atlas.Map(mapRef.current, {
            center,
            zoom: 14,
            style: 'satellite_road_labels',
            authOptions: {
              authType: 'subscriptionKey',
              subscriptionKey: azureMapsKey
            }
          });

          m.controls.add(new window.atlas.control.ZoomControl(), { position: 'top-right' });
          m.controls.add(new window.atlas.control.CompassControl(), { position: 'top-right' });
          m.controls.add(new window.atlas.control.PitchControl(), { position: 'top-right' });

          setMap(m);
        },
        (err) => {
          console.error("Geolocation failed:", err);
          alert('Location access denied.');
        }
      );
    };

    loadAzureMaps();
  }, []);

  const categoryColors = {
    "💣": "black",
    "💡": "gold",
    "🚰": "blue",
    "🧹": "green",
    "🚧": "brown",
    "🚨": "red",
    "Other": "purple"
  };

  const importanceColors = {
    low: 'green',
    medium: 'orange',
    high: 'red'
  };

  const handleReport = async () => {
    const cat = document.getElementById('category').value;
    const desc = document.getElementById('description').value.trim();
    const addr = document.getElementById('address').value.trim();
    if (!desc) return alert('Please add a description.');

    let coords = null;
    if (addr) coords = await geocodeAddress(addr);
    else if (navigator.geolocation) coords = await new Promise(res =>
      navigator.geolocation.getCurrentPosition(
        p => res([p.coords.longitude, p.coords.latitude]),
        () => res(null)
      )
    );
    if (!coords) return alert('Could not determine location.');

    const color = categoryColors[cat] || 'gray';
    const borderColor = importanceColors[importance] || 'gray';

    const circle = new window.atlas.HtmlMarker({
      position: coords,
      htmlContent: `<div style="width:20px;height:20px;border-radius:50%;background:${color};border: 3px solid ${borderColor}"></div>`
    });

    map.markers.add(circle);
    map.setCamera({ center: coords, zoom: 17 });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);

    setUploadedImages([]);
    document.getElementById('description').value = '';
    document.getElementById('address').value = '';
  };

  const geocodeAddress = async (addr) => {
    const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${azureMapsKey}&query=${encodeURIComponent(addr)}`;
    const resp = await fetch(url).then(r => r.json());
    if (resp.results && resp.results.length) {
      const pos = resp.results[0].position;
      return [pos.lon, pos.lat];
    }
    return null;
  };

  const handleFileUpload = (files) => {
    const total = uploadedImages.length + files.length;
    if (total > 3) {
      setAlertMsg("⚠️ Max 3 images allowed");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', paddingTop: 80, position: 'relative', zIndex: 1 }}>

      <div id="map" style={{ width: '100%', height: '400px', marginBottom: 20 }} ref={mapRef}></div>

      <div style={{ padding: 10, background: '#f9f9f9' }}>
        <h3>Report an Issue</h3>

        <div style={{ marginBottom: 10 }}>
          <label>Category:</label><br />
          <select id="category" style={{ width: '100%' }}>
            <option value="💣">Potholes</option>
            <option value="💡">Lighting</option>
            <option value="🚰">Water</option>
            <option value="🧹">Cleanliness</option>
            <option value="🚧">Obstructions</option>
            <option value="🚨">Public Safety</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Description:</label><br />
          <input type="text" id="description" placeholder="Description" style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Address:</label><br />
          <input type="text" id="address" placeholder="Address (if location denied)" style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Importance:</label><br />
          <select value={importance} onChange={(e) => setImportance(e.target.value)} style={{ width: '100%' }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Time:</label><br />
          <input type="datetime-local" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          <label htmlFor="fileUpload" className="upload-btn">📁 Upload</label>
          <input id="fileUpload" type="file" style={{ display: 'none' }} accept="image/*" multiple onChange={(e) => handleFileUpload(Array.from(e.target.files))} />
          <label htmlFor="cameraInput" className="upload-btn">📷 Camera</label>
          <input id="cameraInput" type="file" style={{ display: 'none' }} accept="image/*" capture="environment" multiple onChange={(e) => handleFileUpload(Array.from(e.target.files))} />
        </div>

        <div className="preview-grid" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          {uploadedImages.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={idx} style={{ position: 'relative' }}>
                <img src={url} alt='' style={{ maxHeight: 80, cursor: 'pointer' }} onClick={() => setLightboxSrc(url)} />
                <span onClick={() => removeImage(idx)} style={{ position: 'absolute', top: -8, right: -8, background: 'white', borderRadius: '50%', fontSize: 12, padding: '2px 5px', cursor: 'pointer' }}>❌</span>
              </div>
            )
          })}
        </div>

        <button onClick={handleReport} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Report Issue
        </button>

        {/* Custom Legend */}
<div
  style={{
    position: "absolute",
    top: "90px",
    left: "10px",
    background: "white",
    padding: "10px 15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  }}
>
<h4 style={{ marginTop: 0, fontSize: "16px", marginBottom: "8px" }}>Issue Legend</h4>
<ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
  <li style={{ display: "flex", alignItems: "center", fontSize: "14px", marginBottom: "4px" }}>
    <span style={{ color: "black", marginRight: "6px" }}>⬤</span> Potholes
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "14px", marginBottom: "4px" }}>
    <span style={{ color: "gold", marginRight: "6px" }}>⬤</span> Lighting
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "14px", marginBottom: "4px" }}>
    <span style={{ color: "blue", marginRight: "6px" }}>⬤</span> Water
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "14px", marginBottom: "4px" }}>
    <span style={{ color: "green", marginRight: "6px" }}>⬤</span> Cleanliness
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "14px", marginBottom: "4px" }}>
    <span style={{ color: "brown", marginRight: "6px" }}>⬤</span> Obstructions
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "14px", marginBottom: "4px" }}>
    <span style={{ color: "red", marginRight: "6px" }}>⬤</span> Public Safety
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "14px", marginBottom: "4px" }}>
    <span style={{ color: "purple", marginRight: "6px" }}>⬤</span> Other
  </li>
</ul>

</div>

      </div>

      {showPopup && <div style={{ position: 'fixed', top: 10, right: 10, background: '#28a745', color: 'white', padding: '10px 14px', borderRadius: 5 }}>✅ Issue Registered</div>}
      {showAlert && <div style={{ position: 'fixed', top: 10, right: 10, background: '#dc3545', color: 'white', padding: '10px 14px', borderRadius: 5 }}>{alertMsg}</div>}

      {lightboxSrc && (
        <div onClick={() => setLightboxSrc('')} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <img src={lightboxSrc} alt="lightbox" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 10 }} />
        </div>
      )}
    </div>
  );
}
