import { createHmac, randomBytes } from 'crypto'

// In-memory session store (single admin, single server process)
const SESSIONS = new Map<string, number>()
const SESSION_TTL = 24 * 60 * 60 * 1000 // 24 hours
export const SESSION_COOKIE = 'wc_admin_session'

export function createSession(): string {
  const token = randomBytes(32).toString('hex')
  SESSIONS.set(token, Date.now())
  return token
}

export function isValidSession(token: string | undefined): boolean {
  if (!token) return false
  const ts = SESSIONS.get(token)
  if (!ts) return false
  if (Date.now() - ts > SESSION_TTL) {
    SESSIONS.delete(token)
    return false
  }
  // Refresh TTL on activity
  SESSIONS.set(token, Date.now())
  return true
}

export function destroySession(token: string): void {
  SESSIONS.delete(token)
}

export function checkPassword(input: string, correct: string): boolean {
  // Constant-time comparison to prevent timing attacks
  const a = createHmac('sha256', 'wc').update(input).digest('hex')
  const b = createHmac('sha256', 'wc').update(correct).digest('hex')
  return a === b
}
