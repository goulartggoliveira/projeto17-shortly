import { customAlphabet, nanoid } from "nanoid"
import { createShortUrl, getUrlId } from "../repositories/url.repository.js"


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
    res.send("openurl")
}

export async function deleteUrl(req,res){
    res.send("delete url")
}