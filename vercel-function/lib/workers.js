const notion = require('./notion/utils')
const github = require('./github/utils')
const { redis } = require('./redis/client')

const decodeBase64 = (b) => {
    const stringify = Buffer.from(b, 'base64').toString()
    return JSON.parse(stringify)
}

const getContentList = async (owner, repo) => {
    const root = await github.getRepoRoot(owner, repo, 'main')
    let contentSha
    for (const t of root.data.tree) {
        if (t.path === 'content') {
            contentSha = t.sha
        }
    }
    const seriesData = (
        await github.readFile(owner, repo, 'content/series.json')
    ).data.content

    if (contentSha) {
        return {
            posts: (await github.getTree(owner, repo, contentSha)).data.tree
                .filter((e) => e.path !== 'series.json')
                .map((e) => ({ path: e.path, sha: e.sha })),
            series: decodeBase64(seriesData),
        }
    } else {
        return false
    }
}

module.exports.checkNotionUpdates = async (owner, repo) => {
    const lastUpdate = await redis.get('last_update')
    const notionData = await notion.checkUpdate()
    const files = await getContentList(owner, repo)
    let baseTime = lastUpdate ? lastUpdate : 0

    const allPostsID = notionData.posts.map((p) => p.id)
    const allPostsFilesID = files.posts.map((f) => f.path.split('.')[0])

    const updatedPosts = notionData.posts
        .filter((p) => p.updated >= baseTime)
        .map((p) => p.id)

    const deletedPosts = allPostsID.filter((p) => !allPostsFilesID.includes(p))

    const allSeriesID = notionData.series.map((s) => s.id)
    const allSeriesFilesID = files.series.map((f) => f.id)
    const updatedSeries = notionData.series
        .filter((s) => s.updated >= baseTime)
        .map((s) => s.id)
    const deletedSeries = allSeriesID.filter((s) =>
        allSeriesFilesID.includes(s)
    )

    const result = {
        posts: {
            update: [...new Set([...updatedPosts, ...deletedPosts])],
            delete: files.posts.filter(
                (file) => !allPostsID.includes(file.path.split('.')[0])
            ),
        },
        series: {
            update: [...new Set([...updatedSeries, ...deletedSeries])],
            delete: allSeriesFilesID.filter((id) => !allSeriesID.includes(id)),
        },
    }

    console.log(result)

    // await redis.set('last_update', new Date().getTime())
    // console.log(lastUpdate)
    return notionData.db
}
