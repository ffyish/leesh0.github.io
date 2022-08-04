const { notion } = require('./client')
const {APIErrorCode} = require("@notionhq/client")

const sleep = ms => new Promise(r => setTimeout(r, ms));


const request = async (runner, options) => {
    options.page_size = 100
    options.start_cursor = undefined
    let result = []

    while (true) {
        try {
            const resp = await runner(options);
            result.push(...resp.results)
            if (!resp.has_more) return result
            else {
                options.start_cursor = resp.next_cursor
            }
        } catch (e) {
            if (e.code === APIErrorCode.RateLimited) {
                await sleep(1000)
            } else {
                throw e
            }
        }
    }

}

module.exports.getDB = async (dbID) => {
    const runner = notion.databases.query
    let options = {
        database_id: dbID
    }

    return await request(runner, options)
}
