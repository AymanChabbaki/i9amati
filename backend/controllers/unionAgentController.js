// backend/controllers/unionAgentController.js
const UnionAgent = require('../models/UnionAgent');
const Apartment = require('../models/Apartment');
const User = require('../models/User');

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

// Add a new apartment (auto code)
exports.addApartment = async (req, res) => {
  // Only allow the logged-in union agent to add
  const agent = await UnionAgent.findOne({ user: req.user.id });
  if (!agent) return res.status(404).json({ error: 'Agent not found' });

  // Find last apartment code for this agent
  const lastApt = await Apartment.find({ agent: agent._id })
    .sort({ code: -1 })
    .limit(1);
  const code = getNextApartmentCode(agent.prefix, lastApt[0]?.code);

  const apt = new Apartment({ code, name: req.body.name, residents: [], agent: agent._id });
  await apt.save();
  agent.apartments.push(apt._id);
  await agent.save();
  res.status(201).json(apt);
};

// List all apartments for this agent
exports.listApartments = async (req, res) => {
  const agent = await UnionAgent.findOne({ user: req.user.id });
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  const apartments = await Apartment.find({ agent: agent._id }).populate('residents');
  res.json(apartments);
};

// Add a resident (property owner) to an apartment
exports.addResident = async (req, res) => {
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
exports.removeResident = async (req, res) => {
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
exports.editApartment = async (req, res) => {
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
