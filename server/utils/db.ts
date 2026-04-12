import Database from 'better-sqlite3'
import { mkdirSync, existsSync } from 'fs'
import { join } from 'path'

let _db: Database.Database | null = null

export function useDB(): Database.Database {
  if (_db) return _db

  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

  _db = new Database(join(dataDir, 'woodcraft.db'))
  _db.pragma('journal_mode = WAL')
  _db.pragma('foreign_keys = ON')

  _db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT    NOT NULL,
      slug         TEXT    NOT NULL UNIQUE,
      description  TEXT    DEFAULT '',
      cover_image  TEXT    DEFAULT '',
      sort_order   INTEGER DEFAULT 0,
      featured     INTEGER DEFAULT 0,
      created_at   TEXT    DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id      INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name             TEXT    NOT NULL,
      slug             TEXT    NOT NULL UNIQUE,
      description      TEXT    DEFAULT '',
      price            REAL,
      price_on_request INTEGER DEFAULT 0,
      material         TEXT    DEFAULT '',
      width_cm         REAL,
      height_cm        REAL,
      depth_cm         REAL,
      lead_time        TEXT    DEFAULT '',
      custom_order     INTEGER DEFAULT 0,
      featured         INTEGER DEFAULT 0,
      in_stock         INTEGER DEFAULT 1,
      sort_order       INTEGER DEFAULT 0,
      created_at       TEXT    DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS product_images (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      url         TEXT    NOT NULL,
      alt_text    TEXT    DEFAULT '',
      sort_order  INTEGER DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS enquiries (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name  TEXT    NOT NULL,
      last_name   TEXT    DEFAULT '',
      email       TEXT    NOT NULL,
      phone       TEXT    DEFAULT '',
      interest    TEXT    DEFAULT '',
      product     TEXT    DEFAULT '',
      message     TEXT    DEFAULT '',
      read        INTEGER DEFAULT 0,
      created_at  TEXT    DEFAULT (datetime('now'))
    );
  `)

  return _db
}

// ── Slugify helper ──────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
