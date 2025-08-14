// backend/seed.js
import mongoose from 'mongoose';
import User from './models/User.js';
import UnionAgent from './models/UnionAgent.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({});
  await UnionAgent.deleteMany({});

  const supervisor = new User({
    name: 'Supervisor',
    email: 'supervisor@example.com',
    password_hash: await bcrypt.hash('password', 10),
    role: 'supervisor'
  });
  await supervisor.save();

  const unionAgent = new User({
    name: 'Union Agent',
    email: 'agent@example.com',
    password_hash: await bcrypt.hash('password', 10),
    role: 'union_agent'
  });
  await unionAgent.save();

  const prefix = 'AC';
  await new UnionAgent({ email: unionAgent.email, prefix, user: unionAgent._id }).save();

  const propertyOwner = new User({
    name: 'Property Owner',
    email: 'owner@example.com',
    password_hash: await bcrypt.hash('password', 10),
    role: 'property_owner'
  });
  await propertyOwner.save();

  console.log('Seeded!');
  process.exit();
}

seed();
