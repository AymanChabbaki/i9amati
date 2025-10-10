

import React, { useState } from 'react';
import axios from 'axios';

const MAX_OWNERS = 100;

export default function AddApartment({ onApartmentAdded }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    type: '',
  ownersCount: 1,
  owners: [{ firstName: '', lastName: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Validate unique owner names
  const validateOwners = (owners) => {
    const trimmed = owners.map(o => `${o.firstName} ${o.lastName}`.trim()).filter(Boolean);
    const unique = new Set(trimmed);
    return trimmed.length === unique.size;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOwnersCount = (e) => {
    let count = Math.max(1, Math.min(MAX_OWNERS, parseInt(e.target.value) || 1));
    setForm((prev) => ({
      ...prev,
      ownersCount: count,
      owners: Array(count).fill({ firstName: '', lastName: '' }).map((_, i) => prev.owners[i] || { firstName: '', lastName: '' }),
    }));
  };

  const handleOwnerField = (idx, field, value) => {
    setForm((prev) => {
      const owners = [...prev.owners];
      owners[idx] = { ...owners[idx], [field]: value };
      return { ...prev, owners };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    // Validate unique owner names
    if (!validateOwners(form.owners)) {
      setError('Owner names must be unique.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post('/api/union/apartments', {
        name: form.name,
        address: form.address,
        type: form.type,
        owners: form.owners.filter(o => o.firstName && o.lastName),
      });
      setResult(res.data);
  setForm({ name: '', address: '', type: '', ownersCount: 1, owners: [{ firstName: '', lastName: '' }] });
      if (onApartmentAdded) onApartmentAdded(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding apartment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="px-6 py-3 rounded-xl border-2 border-primary bg-white text-primary font-semibold shadow-md hover:bg-primary hover:text-white transition-colors duration-200 mb-4 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-primary/50"
        onClick={() => setOpen(true)}
        style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}
      >
        <span className="text-lg mr-2">+</span> Add Apartment
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl h-[90vh] relative flex flex-col gap-2">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setOpen(false)}>&times;</button>
            <h2 className="font-bold text-2xl mb-4 text-primary">Add Apartment</h2>
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Apartment Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="input rounded border px-3 py-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Address</label>
                  <input name="address" value={form.address} onChange={handleChange} className="input rounded border px-3 py-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Type</label>
                  <input name="type" value={form.type} onChange={handleChange} className="input rounded border px-3 py-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Number of Property Owners</label>
                  <input type="number" min={1} max={MAX_OWNERS} value={form.ownersCount} onChange={handleOwnersCount} className="input w-20 rounded border px-3 py-2" />
                </div>
                <div className="md:col-span-2 max-h-60 overflow-y-auto pr-2">
                  {Array.from({ length: form.ownersCount }).map((_, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-2 mb-2">
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="font-medium">Owner {idx + 1} First Name</label>
                        <input
                          value={form.owners[idx]?.firstName || ''}
                          onChange={e => handleOwnerField(idx, 'firstName', e.target.value)}
                          required
                          className="input rounded border px-3 py-2"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="font-medium">Last Name</label>
                        <input
                          value={form.owners[idx]?.lastName || ''}
                          onChange={e => handleOwnerField(idx, 'lastName', e.target.value)}
                          required
                          className="input rounded border px-3 py-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl border-2 border-primary bg-white text-primary font-semibold shadow-md hover:bg-primary hover:text-white transition-colors duration-200 w-full text-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Apartment'}
                  </button>
                </div>
                {error && <div className="text-red-500 md:col-span-2">{error}</div>}
                {result && (
                  <div className="mt-2 md:col-span-2">
                    <div className="font-semibold">Apartment and Owners Created!</div>
                    <ul className="mt-1 text-sm">
                      {result.owners?.map((owner, i) => (
                        <li key={i}>
                          <b>{owner.name}</b>: Username <code>{owner.username}</code>, Email <code>{owner.email}</code>, Password <code>{owner.password}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
