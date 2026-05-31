import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [rawKey, ...rest] = trimmed.split('=');
    const key = rawKey.trim();
    const value = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.resolve(process.cwd(), '.env'));
loadEnvFile(path.resolve(process.cwd(), '.env.local'));

const { MONGODB_URI, MONGODB_DB, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
const dryRun = process.argv.includes('--dry-run');

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing MONGODB_URI, ADMIN_EMAIL, or ADMIN_PASSWORD.');
  process.exit(1);
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.models.User ?? mongoose.model('User', userSchema);

await mongoose.connect(MONGODB_URI, MONGODB_DB ? { dbName: MONGODB_DB } : {});

const email = ADMIN_EMAIL.toLowerCase();

if (dryRun) {
  console.log(`Dry run OK: would connect to ${MONGODB_DB || 'default database'} and seed ${email}`);
  await mongoose.disconnect();
  process.exit(0);
}

const existing = await User.findOne({ email });

if (existing) {
  console.log(`Admin already exists: ${email}`);
  await mongoose.disconnect();
  process.exit(0);
}

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
await User.create({ email, passwordHash });
console.log(`Admin created: ${email}`);
await mongoose.disconnect();
