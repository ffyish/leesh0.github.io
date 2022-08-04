const worker = require('./lib/workers')
const fs = require('fs')

const repo = {
    owner: 'leesh0',
    repo: 'notion-gatsby-blog',
}

async function main() {
    // const result = await notion.checkUpdate()
    const data = await worker.checkNotionUpdates(repo.owner, repo.repo)
    fs.writeFileSync('result.json', JSON.stringify(data))
    console.log('Done')
}
main()
