import { customAlphabet, nanoid } from "nanoid"
import { createShortUrl, deleteUserUrl, getOnlyUserId, getUrlId, getUrlName, increaseVisits } from "../repositories/url.repository.js"


export async function shortenUrl(req,res){
    const { url } = req.body
    const { userId } = res.locals
    const nanoid = customAlphabet('123456789abcdef', 8)
    const shortUrl = nanoid()
   
    try {
       const result = await createShortUrl(url, shortUrl, userId)
        res.status(201).send(result.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getUrl(req,res){
    const { id } = req.params
    
    try {
        const url = await getUrlId(id)
        if(url.rowCount === 0) return res.status(404).send(`url not found`)

        res.send(url.rows[0])


    } catch (error) {
        res.status(500).send(error.message)
    }
}
    
export async function openUrl(req,res){

    const { shortUrl } = req.params

    try {

        const url = await getUrlName(shortUrl)
        if(url.rowCount === 0) return res.status(404).send(`url not found`)

        await increaseVisits(shortUrl)

        res.redirect(url.rows[0].url)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteUrl(req,res){
    const { id } = req.params
    const { userId} = res.locals

    try {
        const url = await getOnlyUserId(id)
        if(url.rowCount === 0) return res.status(404).send(`url not found`)
        if(url.rows[0].userId !== userId) return res.status(401).send(`cannot delete this url`)

        await deleteUserUrl(id)
        res.sendStatus(204)

    } catch (error) {
        res.status(500).send(error.message)
    }
}