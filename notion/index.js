// const worker = require('./lib/workers')
const fs = require('fs')
const config = require("./config.json")
const worker = require("./lib/workers")
const core = require("@actions/core")

async function main () {
    core.setOutput("update_result", "false")
    const result = await worker.update()
    console.log(result)
}


main()