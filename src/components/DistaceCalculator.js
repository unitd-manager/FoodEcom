import React, { useState } from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const calculateDistance = async () => {
    const API_KEY = 'AIzaSyBHLHnqaZwIO-KmE6d9OI0eHCZPt3HGRY8'; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(
      destination
    )}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === 'OK') {
        const result = data.rows[0].elements[0];
        if (result.status === 'OK') {
          setDistance(result.distance.text);
          setDuration(result.duration.text);
        } else {
          alert('Error calculating distance: ' + result.status);
        }
      } else {
        alert('Error with Distance Matrix API: ' + data.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while calculating the distance.');
    }
  };

  return (
    <div>
      <h2>Distance Calculator</h2>
      <input
        type="text"
        placeholder="Enter origin (e.g., New York, NY)"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter destination (e.g., Los Angeles, CA)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={calculateDistance}>Calculate Distance</button>

      {distance && (
        <div>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}
    </div>
  );
};

export default DistanceCalculator;
