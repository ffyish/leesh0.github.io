const { octokit } = require('./client')

module.exports.getRepoRoot = async (owner, repo, branch) => {
    return await octokit.request(
        'GET /repos/{owner}/{repo}/git/trees/{branch}',
        {
            owner,
            repo,
            branch,
        }
    )
}

module.exports.getTree = async (owner, repo, sha) => {
    return await octokit.request('GET /repos/{owner}/{repo}/git/trees/{sha}', {
        owner,
        repo,
        sha,
    })
}

module.exports.readFile = async (owner, repo, path) => {
    return await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path,
    })
}
