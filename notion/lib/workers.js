const notion = require('./notion/utils')
const config = require("../config.json")
const fs = require("fs")
const path = require("path")

const rootDir = process.env.PWD
const contentDir = path.resolve(rootDir, config.contentPath)



module.exports.update = async () => {
    const savedSeries = JSON.parse(fs.readFileSync(path.resolve(contentDir, "series.json")))
    const savedContents = (fs.readdirSync(contentDir)).filter(f => f !== "series.json").map(f => f.split(".")[0])
    
    const postsList = await notion.getDB(config.postsDB)
    const seriesList = await notion.getDB(config.seriesDB)

    postsList.forEach(post => {
        post.created = new Date(post.created_time).getTime()
        post.updated = new Date(post.last_edited_time).getTime()
    })
    seriesList.forEach(series => {
        series.created = new Date(series.created_time).getTime()
        series.updated = new Date(series.last_edited_time).getTime()
    })

    const postsIds = postsList.map(p => p.id)
    const seriesIds = seriesList.map(s=>s.id)

    const updatedPosts = postsList.filter(post => post.updated >= config.lastExcute)
    const deletedPosts = postsList.filter(post => !savedContents.includes(post.id))
    const deletePosts = savedContents.filter(c => !postsIds.includes(c))
    
    const savedSeriesIds = savedSeries.map(s=>s.id)
    const updatedSeries = seriesList.filter(series => series.updated >= config.lastExcute)
    const deletedSeries = seriesList.filter(series => !savedSeriesIds.includes(series.id))
    const deleteSeries = savedSeriesIds.filter(s=> !seriesIds.includes(s))

    const receipt = {
        posts: {
            update: [...new Set([...updatedPosts, ...deletedPosts])],
            delete: deletePosts
        },
        series: {
            update: [...new Set([...updatedSeries, ...deletedSeries])],
            delete: deleteSeries
        }
    }
    return receipt
}