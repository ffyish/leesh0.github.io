const { Octokit } = require('octokit')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
