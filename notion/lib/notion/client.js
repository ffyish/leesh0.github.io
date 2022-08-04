const { Client } = require('@notionhq/client')

module.exports.notion = new Client({
    auth: process.env.NOTION_TOKEN,
})
