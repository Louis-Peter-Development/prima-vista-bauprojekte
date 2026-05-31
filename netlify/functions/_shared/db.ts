import mongoose, { Schema, type Model } from 'mongoose';
import { requireEnv, getEnv } from './env';
import type { PostStatus, TiptapDoc } from './content';

export interface PostDocument {
  title: string;
  slug: string;
  author: string;
  coverImageUrl: string;
  body: TiptapDoc;
  excerpt: string;
  readingTime: number;
  status: PostStatus;
  sortOrder: number;
  views: number;
  likes: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentDocument {
  postSlug: string;
  name: string;
  body: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument {
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PostModel = Model<PostDocument>;
export type CommentModel = Model<CommentDocument>;
export type UserModel = Model<UserDocument>;

type Cache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __pvMongoose: Cache | undefined;
}

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    author: { type: String, default: 'Prima Vista Bauprojekte', trim: true },
    coverImageUrl: { type: String, default: '', trim: true },
    body: { type: Schema.Types.Mixed, required: true },
    excerpt: { type: String, default: '', trim: true },
    readingTime: { type: Number, default: 1, min: 1 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    sortOrder: { type: Number, default: 0, index: true },
    views: { type: Number, default: 0, min: 0 },
    likes: { type: Number, default: 0, min: 0 },
    publishedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true },
);

const commentSchema = new Schema<CommentDocument>(
  {
    postSlug: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

function models() {
  const Post =
    (mongoose.models.Post as PostModel | undefined) ??
    mongoose.model<PostDocument>('Post', postSchema);
  const Comment =
    (mongoose.models.Comment as CommentModel | undefined) ??
    mongoose.model<CommentDocument>('Comment', commentSchema);
  const User =
    (mongoose.models.User as UserModel | undefined) ??
    mongoose.model<UserDocument>('User', userSchema);

  return { Post, Comment, User };
}

export async function connectDb() {
  const uri = requireEnv('MONGODB_URI');
  const dbName = getEnv('MONGODB_DB');
  const cache = (globalThis.__pvMongoose ??= { conn: null, promise: null });

  if (cache.conn) return { mongoose: cache.conn, ...models() };

  if (!cache.promise) {
    mongoose.set('bufferCommands', false);
    cache.promise = mongoose.connect(uri, dbName ? { dbName } : {});
  }

  cache.conn = await cache.promise;
  return { mongoose: cache.conn, ...models() };
}
