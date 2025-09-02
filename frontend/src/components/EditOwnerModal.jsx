import React, { useState } from 'react';

export default function EditOwnerModal({ owner, onSave, onClose, readOnly }) {
  const [form, setForm] = useState({
    name: owner.name || '',
    username: owner.username || '',
    email: owner.email || '',
    phone: owner.phone || '',
    ownership_share: owner.ownership_share || '',
    unit_number: owner.unit_number || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative" style={{ minHeight: 'auto', maxHeight: '90vh' }}>
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold focus:outline-none"
          style={{ zIndex: 10 }}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="font-bold text-lg mb-4">{readOnly ? 'Owner Details' : 'Edit Owner'}</h2>
        <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" required readOnly={readOnly} />
          </div>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input name="username" value={form.username} onChange={handleChange} className="w-full border rounded p-2" required readOnly={readOnly} />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" required readOnly={readOnly} />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded p-2" readOnly={readOnly} />
          </div>
          <div>
            <label className="block text-sm font-medium">Unit Number</label>
            <input name="unit_number" value={form.unit_number} onChange={handleChange} className="w-full border rounded p-2" readOnly={readOnly} />
          </div>
          <div>
            <label className="block text-sm font-medium">Ownership Share (%)</label>
            <input name="ownership_share" value={form.ownership_share} onChange={handleChange} className="w-full border rounded p-2" type="number" min="0" max="100" readOnly={readOnly} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200">{readOnly ? 'Close' : 'Cancel'}</button>
            {!readOnly && <button type="submit" className="px-4 py-2 rounded bg-primary text-white">Save</button>}
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
