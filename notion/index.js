// const worker = require('./lib/workers')
const fs = require('fs')
const config = require("./config.json")



// async function main2() {
//     // const result = await notion.checkUpdate()
//     const data = await worker.checkNotionUpdates(repo.owner, repo.repo)
//     fs.writeFileSync('result.json', JSON.stringify(data))
//     console.log('Done')
// }

console.log(fs.readdirSync(config.contentPath))
