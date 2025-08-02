// src/components/CameraCapture.jsx
import React, { useEffect, useRef } from 'react';

const CameraCapture = ({ onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    getCamera();

    // Cleanup on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center">
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-md rounded-lg shadow-lg" />
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-white text-black rounded-md">
        Close Camera
      </button>
    </div>
  );
};

export default CameraCapture;
