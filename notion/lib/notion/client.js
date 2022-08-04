const { Client } = require('@notionhq/client')

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports.notion = new Client({
    auth: process.env.NOTION_TOKEN,
})
