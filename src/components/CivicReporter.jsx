
import { useEffect, useRef, useState } from 'react';
import api from '../api';

export default function CivicReporter() {
  const mapRef = useRef(null);
  const azureMapsKey = '2CgXwnuDlRmB4SrahHCV6UL3k2DCI3K9WPANNj8oyOQjYJSJYebCJQQJ99BHACYeBjFFCASfAAAgAZMP121o';
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [map, setMap] = useState(null);
  const [importance, setImportance] = useState('low');
  const [issues, setIssues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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

    const initMap = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const center = [position.coords.longitude, position.coords.latitude];
        const m = new window.atlas.Map(mapRef.current, {
          center,
          zoom: 13,
          style: 'road',
          authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: azureMapsKey
          }
        });

        m.controls.add(new window.atlas.control.ZoomControl(), { position: 'top-right' });
        m.controls.add(new window.atlas.control.CompassControl(), { position: 'top-right' });
        m.controls.add(new window.atlas.control.PitchControl(), { position: 'top-right' });

        setMap(m);
        fetchIssues(center, m);
      } catch (err) {
        console.error("Failed to initialize map or fetch issues", err);
        alert("Could not load map or issues.");
      }
    };

    const fetchIssues = async (center, map) => {
      try {
        const res = await api.get(`/issues/nearby?lat=${center[1]}&long=${center[0]}&radius=5000`);
        const filtered = selectedCategory ? res.data.filter(i => i.category === selectedCategory) : res.data;
        setIssues(filtered);

        filtered.forEach(issue => {
          if (issue.lat && issue.long) {
            const color = categoryColors[issue.category] || 'gray';
            const border = importanceColors[issue.importance || 'low'] || 'gray';

            const markerEl = document.createElement('div');
            markerEl.style.width = '22px';
            markerEl.style.height = '22px';
            markerEl.style.background = color;
            markerEl.style.border = `3px solid ${border}`;
            markerEl.style.borderRadius = '50%';
            markerEl.style.cursor = 'pointer';
            markerEl.title = `${issue.title} - ${issue.category}`;
            markerEl.style.boxShadow = '0 0 6px rgba(0,0,0,0.3)';

            markerEl.onclick = () => {
              map.setCamera({ center: [issue.long, issue.lat], zoom: 17 });
              alert(
                `📍 Issue Details\n\n📝 Title: ${issue.title}\n📂 Category: ${issue.category}\n🧾 Description: ${issue.desc}\n🔥 Importance: ${issue.importance || 'low'}`
              );
            };

            const marker = new window.atlas.HtmlMarker({
              position: [issue.long, issue.lat],
              htmlContent: markerEl
            });

            map.markers.add(marker);
          }
        });
      } catch (err) {
        console.error('Failed to fetch issues', err);
      }
    };

    loadAzureMaps();
  }, [selectedCategory]);

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

  const handleReport = async () => {
    const cat = document.getElementById('category')?.value;
    const desc = document.getElementById('description')?.value.trim();
    const addr = document.getElementById('address')?.value.trim();

    if (!desc) return alert('Please add a description.');
    if (!map) return alert("Map not initialized. Please wait...");

    let coords = null;
    if (addr) {
      const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${azureMapsKey}&query=${encodeURIComponent(addr)}`;
      const resp = await fetch(url).then(r => r.json());
      if (resp.results && resp.results.length) {
        const pos = resp.results[0].position;
        coords = [pos.lon, pos.lat];
      }
    } else if (navigator.geolocation) {
      coords = await new Promise(res =>
        navigator.geolocation.getCurrentPosition(
          p => res([p.coords.longitude, p.coords.latitude]),
          () => res(null)
        )
      );
    }

    if (!coords) return alert('Could not determine location.');

    const existing = issues.find(i => Math.abs(i.lat - coords[1]) < 0.0005 && Math.abs(i.long - coords[0]) < 0.0005 && i.desc === desc);
    if (existing) return alert('⚠️ Similar issue already exists nearby. Consider upvoting it.');

    const formData = new FormData();
    formData.append('title', `${cat} Issue`);
    formData.append('desc', desc);
    formData.append('lat', coords[1]);
    formData.append('long', coords[0]);
    formData.append('category', cat);
    formData.append('is_anonymous', true);
    formData.append('importance', importance);
    uploadedImages.forEach(file => {
      formData.append('images', file);
    });

    try {
      await api.post('/issues', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      setUploadedImages([]);
      document.getElementById('description').value = '';
      document.getElementById('address').value = '';
    } catch (err) {
      console.error("❌ Backend error:", err.response?.data || err.message);
      alert(err.response?.data?.error || 'Failed to report issue');
    }
  };

  return (
    <div className="pt-20 px-4 font-sans">
      <div id="map" ref={mapRef} className="w-full h-[400px] mb-6 rounded shadow border" />

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">📢 Report an Issue</h3>

        <label>Category:</label>
        <select id="category" className="w-full mb-2 border p-2 rounded">
          <option value="💣">Potholes</option>
          <option value="💡">Lighting</option>
          <option value="🚰">Water</option>
          <option value="🧹">Cleanliness</option>
          <option value="🚧">Obstructions</option>
          <option value="🚨">Public Safety</option>
          <option value="Other">Other</option>
        </select>

        <label>Description:</label>
        <input type="text" id="description" className="w-full mb-2 border p-2 rounded" placeholder="Describe the issue" />

        <label>Address (optional):</label>
        <input type="text" id="address" className="w-full mb-2 border p-2 rounded" placeholder="Enter address or use location" />

        <label>Importance:</label>
        <select value={importance} onChange={(e) => setImportance(e.target.value)} className="w-full mb-2 border p-2 rounded">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex flex-wrap gap-2 mb-2">
          <label htmlFor="fileUpload" className="cursor-pointer bg-blue-600 text-white py-1 px-3 rounded">📁 Upload</label>
          <input id="fileUpload" type="file" accept="image/*" multiple className="hidden" onChange={e => handleFileUpload(Array.from(e.target.files))} />

          <label htmlFor="cameraInput" className="cursor-pointer bg-green-600 text-white py-1 px-3 rounded">📷 Camera</label>
          <input id="cameraInput" type="file" accept="image/*" capture="environment" multiple className="hidden" onChange={e => handleFileUpload(Array.from(e.target.files))} />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {uploadedImages.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={idx} className="relative">
                <img src={url} alt="preview" className="h-20 rounded cursor-pointer" onClick={() => setLightboxSrc(url)} />
                <span onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-white border rounded-full text-xs px-1 cursor-pointer">❌</span>
              </div>
            );
          })}
        </div>

        <button onClick={handleReport} className="bg-blue-600 text-white px-4 py-2 rounded">Report Issue</button>
      </div>

      {showPopup && <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">✅ Issue Registered</div>}
      {showAlert && <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow">{alertMsg}</div>}
      {lightboxSrc && (
        <div onClick={() => setLightboxSrc('')} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <img src={lightboxSrc} alt="zoomed" className="max-w-[90%] max-h-[90%] rounded" />
        </div>
      )}
    </div>
  );
}
