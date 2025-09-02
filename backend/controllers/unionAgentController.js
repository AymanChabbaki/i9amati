// backend/controllers/unionAgentController.js
import UnionAgent from '../models/UnionAgent.js';
import Apartment from '../models/Apartment.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Helper: Generate next apartment code for an agent
function getNextApartmentCode(prefix, lastCode) {
  // If no apartments, start at 100
  let nextNum = 100;
  if (lastCode) {
    const lastNum = parseInt(lastCode.replace(prefix, ''));
    nextNum = lastNum + 1;
  }
  return `${prefix}${nextNum}`;
}

// Add a new apartment (with owners and credential generation)
export const addApartment = async (req, res) => {
  const { name, address, type, owners } = req.body; // owners: array of { firstName, lastName }
  const agent = await UnionAgent.findOne({ user: req.user.id });
  if (!agent) return res.status(404).json({ error: 'Agent not found' });

  // Find last apartment code for this agent
  const lastApt = await Apartment.find({ agent: agent._id })
    .sort({ code: -1 })
    .limit(1);
  const code = getNextApartmentCode(agent.prefix, lastApt[0]?.code);

  // Create apartment (owners will be added after)
  const apt = new Apartment({ code, name, address, type, owners: [], residents: [], agent: agent._id });
  await apt.save();

  // For each owner, create a user with generated credentials
  let createdOwners = [];
  for (let i = 0; i < owners.length; i++) {
    const owner = owners[i];
    const ownerName = `${owner.firstName} ${owner.lastName}`.trim();
    // Username: <firstName><lastName><apartment_code>
    // Password: <firstName><lastName><apartment_objectid>
    // Email: <firstName>.<lastName>.<code>.<i>@owners.iqamati.local
    const username = `${owner.firstName}${owner.lastName}${code}`.replace(/\s+/g, '');
    const rawPassword = `${owner.firstName}${owner.lastName}${apt._id}`;
    const password_hash = await bcrypt.hash(rawPassword, 10);
    const email = `${owner.firstName.toLowerCase()}.${owner.lastName.toLowerCase()}.${code.toLowerCase()}.${i}@owners.iqamati.local`;
    const user = new User({
      name: ownerName,
      username,
      email,
      password_hash,
      role: 'property_owner',
      apartment: apt._id,
      status: 'ACTIVE'
    });
    await user.save();
    apt.owners.push(user._id);
    createdOwners.push({ name: ownerName, username, password: rawPassword, email });
  }
  await apt.save();
  agent.apartments.push(apt._id);
  await agent.save();
  res.status(201).json({ apartment: apt, owners: createdOwners });
};
// Property owner: get their own apartment and property details
export const getOwnerApartment = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== 'property_owner') return res.status(403).json({ error: 'Forbidden' });
  const apartment = await Apartment.findById(user.apartment)
    .populate('owners', 'name username')
    .populate('residents', 'name username');
  if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
  res.json({ apartment });
};

// List all apartments for this agent
export const listApartments = async (req, res) => {
  const agent = await UnionAgent.findOne({ user: req.user.id });
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  const apartments = await Apartment.find({ agent: agent._id })
    .populate('owners', 'name username email')
    .populate('residents', 'name username');
  res.json(apartments);
};

// Add a resident (property owner) to an apartment
export const addResident = async (req, res) => {
  const { apartmentId, userId } = req.body;
  const apt = await Apartment.findOne({ _id: apartmentId, agent: req.user.id });
  if (!apt) return res.status(404).json({ error: 'Apartment not found' });
  if (!apt.residents.includes(userId)) apt.residents.push(userId);
  await apt.save();
  // Link property owner to apartment
  await User.findByIdAndUpdate(userId, { apartment: apt._id });
  res.json(apt);
};

// Remove a resident from an apartment
export const removeResident = async (req, res) => {
  const { apartmentId, userId } = req.body;
  const apt = await Apartment.findOne({ _id: apartmentId, agent: req.user.id });
  if (!apt) return res.status(404).json({ error: 'Apartment not found' });
  apt.residents = apt.residents.filter(r => r.toString() !== userId);
  await apt.save();
  // Unlink property owner from apartment
  await User.findByIdAndUpdate(userId, { $unset: { apartment: 1 } });
  res.json(apt);
};

// Edit apartment details (name)
export const editApartment = async (req, res) => {
  const { apartmentId, name } = req.body;
  const apt = await Apartment.findOneAndUpdate(
    { _id: apartmentId, agent: req.user.id },
    { name },
    { new: true }
  );
  if (!apt) return res.status(404).json({ error: 'Apartment not found' });
  res.json(apt);
};

// Comments in code explain:
// - How apartment codes are generated (prefix + next number)
// - How agent/apartment/user relationships are handled
// - How security is enforced (agent can only manage their own apartments)
