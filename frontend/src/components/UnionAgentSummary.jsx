import axios from 'axios';

// Always set Authorization header from localStorage before each request
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('iqamati_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
import React, { useState, useEffect } from 'react';


export default function UnionAgentSummary({ newOwners = [] }) {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    async function fetchApartments() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/union/apartments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApartments(res.data);
        // Flatten all owners for overview
        let allOwners = [];
        res.data.forEach(apt => {
          if (apt.owners && Array.isArray(apt.owners)) {
            apt.owners.forEach(owner => {
              allOwners.push({ ...owner, apartment: { name: apt.name, code: apt.code } });
            });
          }
        });
        setOwners(allOwners);
      } catch (err) {
        setError('Failed to load apartments');
      } finally {
        setLoading(false);
      }
    }
    fetchApartments();
  }, []);

  // Show new owner credentials if passed from AddApartment
  const showNewOwners = Array.isArray(newOwners) && newOwners.length > 0;

  if (loading) return <div>Loading apartments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Only show new owner credentials if present
  if (showNewOwners) {
    return (
      <div className="mt-6">
        <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
          <div className="font-bold mb-1">New Owner Credentials</div>
          <ul className="list-disc ml-6 text-sm">
            {newOwners.map((owner, idx) => (
              <li key={idx}>
                <span className="font-semibold">{owner.name}</span>: Username <span className="font-mono">{owner.username}</span>, Password <span className="font-mono">{owner.password}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  // Otherwise, render nothing
  return null;
}
