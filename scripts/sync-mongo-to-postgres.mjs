import mongodb from "mongodb";
import { PrismaClient } from "../generated/prisma/index.js";

const { BSON, MongoClient } = mongodb;
const { EJSON } = BSON;
const mongoUri = process.env.MONGODB_URI;
const batchSize = Number.parseInt(process.env.MONGO_SYNC_BATCH_SIZE ?? "500", 10);

if (!mongoUri) {
  console.error("Missing MONGODB_URI. Example: MONGODB_URI='mongodb+srv://...' pnpm sync:mongo");
  process.exit(1);
}

const mongo = new MongoClient(mongoUri);
const prisma = new PrismaClient();

function toDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toMongoId(value) {
  if (value == null) return "";
  return typeof value === "string" ? value : value.toString();
}

function toJsonDocument(document) {
  return EJSON.serialize(document, { relaxed: false });
}

async function upsertTypedUser(document) {
  await prisma.user.upsert({
    where: { id: toMongoId(document._id) },
    update: {
      name: document.name ?? null,
      email: document.email ?? null,
      emailVerified: toDate(document.emailVerified),
      image: document.image ?? null,
    },
    create: {
      id: toMongoId(document._id),
      name: document.name ?? null,
      email: document.email ?? null,
      emailVerified: toDate(document.emailVerified),
      image: document.image ?? null,
    },
  });
}

async function upsertTypedAccount(document) {
  await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: document.provider,
        providerAccountId: document.providerAccountId,
      },
    },
    update: {
      id: toMongoId(document._id),
      userId: document.userId,
      type: document.type,
      refresh_token: document.refresh_token ?? null,
      access_token: document.access_token ?? null,
      expires_at: document.expires_at ?? null,
      token_type: document.token_type ?? null,
      scope: document.scope ?? null,
      id_token: document.id_token ?? null,
      session_state: document.session_state ?? null,
      refresh_token_expires_in: document.refresh_token_expires_in ?? null,
    },
    create: {
      id: toMongoId(document._id),
      userId: document.userId,
      type: document.type,
      provider: document.provider,
      providerAccountId: document.providerAccountId,
      refresh_token: document.refresh_token ?? null,
      access_token: document.access_token ?? null,
      expires_at: document.expires_at ?? null,
      token_type: document.token_type ?? null,
      scope: document.scope ?? null,
      id_token: document.id_token ?? null,
      session_state: document.session_state ?? null,
      refresh_token_expires_in: document.refresh_token_expires_in ?? null,
    },
  });
}

async function upsertTypedSession(document) {
  await prisma.session.upsert({
    where: { sessionToken: document.sessionToken },
    update: {
      id: toMongoId(document._id),
      userId: document.userId,
      expires: toDate(document.expires) ?? new Date(0),
    },
    create: {
      id: toMongoId(document._id),
      sessionToken: document.sessionToken,
      userId: document.userId,
      expires: toDate(document.expires) ?? new Date(0),
    },
  });
}

async function upsertTypedVerificationToken(document) {
  await prisma.verificationToken.upsert({
    where: {
      identifier_token: {
        identifier: document.identifier,
        token: document.token,
      },
    },
    update: {
      expires: toDate(document.expires) ?? new Date(0),
    },
    create: {
      identifier: document.identifier,
      token: document.token,
      expires: toDate(document.expires) ?? new Date(0),
    },
  });
}

async function upsertTypedDocument(collection, document) {
  if (collection === "User") return upsertTypedUser(document);
  if (collection === "Account") return upsertTypedAccount(document);
  if (collection === "Session") return upsertTypedSession(document);
  if (collection === "VerificationToken") return upsertTypedVerificationToken(document);
}

function toRawRow(collection, document) {
  return {
    collection,
    mongoId: toMongoId(document._id),
    document: toJsonDocument(document),
    createdAt: toDate(document.createdAt),
    updatedAt: toDate(document.updatedAt),
  };
}

async function insertRawBatch(rows) {
  if (rows.length === 0) return;

  await prisma.mongoCollectionDocument.createMany({
    data: rows,
    skipDuplicates: true,
  });
}

async function syncCollection(db, collectionName) {
  const collection = db.collection(collectionName);
  const total = await collection.countDocuments();
  let migrated = 0;
  let rawRows = [];

  console.log(`Syncing ${collectionName}: ${total} documents`);

  for await (const document of collection.find({}).batchSize(batchSize)) {
    rawRows.push(toRawRow(collectionName, document));
    try {
      await upsertTypedDocument(collectionName, document);
    } catch (error) {
      console.warn(`  typed sync skipped for ${collectionName}/${toMongoId(document._id)}: ${error.message}`);
    }
    migrated += 1;

    if (migrated % batchSize === 0 || migrated === total) {
      await insertRawBatch(rawRows);
      rawRows = [];
      console.log(`  ${collectionName}: ${migrated}/${total}`);
    }
  }

  await insertRawBatch(rawRows);

  return { collection: collectionName, total, migrated };
}

try {
  await mongo.connect();
  const db = mongo.db();
  const collections = await db.listCollections().toArray();
  const typedOrder = ["User", "Account", "Session", "VerificationToken"];
  const orderedCollections = collections.toSorted((a, b) => {
    const aIndex = typedOrder.indexOf(a.name);
    const bIndex = typedOrder.indexOf(b.name);
    if (aIndex !== -1 || bIndex !== -1) {
      return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
    }
    return a.name.localeCompare(b.name);
  });
  const summary = [];

  for (const collection of orderedCollections) {
    summary.push(await syncCollection(db, collection.name));
  }

  console.log("Mongo to Postgres sync complete.");
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await prisma.$disconnect();
  await mongo.close();
}
