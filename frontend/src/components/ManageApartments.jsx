import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditOwnerModal from './EditOwnerModal';
import { Eye } from 'lucide-react';

export default function ManageApartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [editingOwner, setEditingOwner] = useState(null);
  const [editingAptId, setEditingAptId] = useState(null);
  const [viewingOwner, setViewingOwner] = useState(null);

  useEffect(() => {
    async function fetchApartments() {
      setLoading(true);
      try {
        const res = await axios.get('/api/union/apartments');
        setApartments(res.data);
      } catch (err) {
        setError('Failed to load apartments');
      } finally {
        setLoading(false);
      }
    }
    fetchApartments();
  }, [refresh]);

  const handleDeleteApartment = async (aptId) => {
    if (!window.confirm('Are you sure you want to delete this apartment?')) return;
    try {
      await axios.delete(`/api/union/apartments/${aptId}`);
      setRefresh(r => r + 1);
    } catch (err) {
      alert('Failed to delete apartment');
    }
  };

  const handleRemoveOwner = async (aptId, ownerId) => {
    if (!window.confirm('Remove this owner from apartment?')) return;
    try {
      await axios.delete(`/api/union/apartments/${aptId}/owner/${ownerId}`);
      setRefresh(r => r + 1);
    } catch (err) {
      alert('Failed to remove owner');
    }
  };

  const handleEditOwner = (aptId, owner) => {
    setEditingAptId(aptId);
    setEditingOwner(owner);
  };

  const handleSaveOwner = async (form) => {
    try {
      await axios.put(`/api/union/apartments/${editingAptId}/owner/${editingOwner._id}`, form);
      setEditingOwner(null);
      setEditingAptId(null);
      setRefresh(r => r + 1);
    } catch (err) {
      alert('Failed to update owner');
    }
  };

  if (loading) return <div>Loading apartments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-xl mb-4">All Apartments</h2>
      {apartments.length === 0 && <div>No apartments found.</div>}
      <div className="space-y-6">
        {apartments.map(apt => (
          <div key={apt._id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold text-lg">{apt.name}</span>
                <span className="ml-2 text-xs text-gray-500">({apt.code})</span>
              </div>
              <button
                className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm font-semibold transition"
                onClick={() => handleDeleteApartment(apt._id)}
              >
                Delete Apartment
              </button>
            </div>
            <div className="text-sm text-gray-700 mb-2">Address: {apt.address || 'N/A'} | Type: {apt.type || 'N/A'}</div>
            <div className="text-sm font-medium mb-1">Owners:</div>
            <ul className="ml-4 list-disc text-sm">
              {Array.isArray(apt.owners) && apt.owners.length > 0 ? (
                apt.owners.map((owner, idx) => {
                  // owner may be an ObjectId or a populated object
                  const key = owner._id || owner.id || idx;
                  const name = owner.name || owner.fullName || owner.username || 'Unknown';
                  const username = owner.username || owner.email || '';
                  return (
                    <li key={key} className="flex items-center justify-between gap-2 py-1">
                      <span>{name} <span className="text-xs text-gray-400">({username})</span></span>
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-semibold flex items-center gap-1"
                          title="View Owner"
                          onClick={() => setViewingOwner(owner)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold"
                          onClick={() => handleEditOwner(apt._id, owner)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold"
                          onClick={() => handleRemoveOwner(apt._id, owner._id || owner.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-400">No owners</li>
              )}
            </ul>
          </div>
        ))}
      </div>
      {editingOwner && (
        <EditOwnerModal
          owner={editingOwner}
          onSave={handleSaveOwner}
          onClose={() => { setEditingOwner(null); setEditingAptId(null); }}
        />
      )}
      {viewingOwner && (
        <EditOwnerModal
          owner={viewingOwner}
          onSave={() => setViewingOwner(null)}
          onClose={() => setViewingOwner(null)}
          readOnly
        />
      )}
    </div>
  );
}
