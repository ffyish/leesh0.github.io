const { notion } = require('./client')

const postsDB = process.env.POSTS_DB_ID
const seriesDB = process.env.SERIES_DB_ID

module.exports.checkUpdate = async () => {
    const posts = await notion.databases.query({
        database_id: postsDB,
    })
    const series = await notion.databases.query({
        database_id: seriesDB,
    })

    return {
        posts: posts.results.map((post) => ({
            type: post.obj,
            id: post.id,
            created: new Date(post.created_time).getTime(),
            updated: new Date(post.last_edited_time).getTime(),
        })),
        series: series.results.map((series) => ({
            type: series.obj,
            id: series.id,
            created: new Date(series.created_time).getTime(),
            updated: new Date(series.last_edited_time).getTime(),
        })),
        db: posts,
    }
}
