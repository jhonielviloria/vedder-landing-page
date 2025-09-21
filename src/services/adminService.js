import { mysql } from '../lib/mysql';

export async function fetchAdminStats() {
  return mysql.getAdminStats();
}