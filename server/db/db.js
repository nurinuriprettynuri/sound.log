import { Pool } from "pg";
import KEYS from "../../config/keys";

var pool = new Pool({
  connectionString: KEYS.DATABASE_URL,
});

export default pool;
