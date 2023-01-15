import { createClient } from "redis";

const redisOpts = {
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PW,
};

let redis;

if (process.env.NODE_ENV === "production") {
  redis = createClient(redisOpts);
  redis.connect();
} else {
  if (!global.__redisdb) {
    global.__redis_db = createClient(redisOpts);
    global.__redis_db.connect();
  }
  redis = global.__redis_db;
}

redis.on("error", (err) => console.error(err));

export { redis };
