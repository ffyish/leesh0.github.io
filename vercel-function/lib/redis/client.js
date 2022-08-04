const Redis = require('ioredis')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports.redis = new Redis(process.env.REDIS_URL)
