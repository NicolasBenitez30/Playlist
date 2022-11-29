import express from 'express'

const router = express.Router()

import Playlist from '../models/playlist.model.js'

//endpoints

router.post('/lists', async (req, res) => {
    try {
        const playlist = req.body
        await Playlist.create(playlist)
        res.status(201).send(playlist)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/lists', async (req, res) => {
    try {
        const playlist = await Playlist.find()
        res.send(playlist)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/lists/:nombre', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        res.send(playlist)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/lists/:nombre', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        let playlist = req.body
        await Playlist.findOneAndUpdate({ nombre: nombrePlaylist}, playlist)
        const playlistResponse = await Playlist.findOne({ nombre: nombrePlaylist})
        res.send(playlistResponse)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/lists/:nombre', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        await Playlist.findOneAndRemove({ nombre: nombrePlaylist})
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        res.send(playlist.canciones)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs/:titulo', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        let tituloCancion = req.params.titulo
        const cancion = playlist.canciones.find(x => x.titulo == tituloCancion)
        res.send(cancion)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.post('/lists/:nombre/songs', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const cancion = req.body
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        lista.canciones.push(cancion)
        await Playlist.findOneAndUpdate({nombre: nombrePlaylist}, lista)
        res.status(201).send(lista)
        // const playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        // await playlist.canciones.create(cancion)
        // res.status(201).send(cancion)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/lists/:nombre/songs/:titulo', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        let tituloCancion = req.params.titulo
        let cancionUpdate = req.body
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = lista.canciones.find(x => x.titulo == tituloCancion)
        cancion.titulo = cancionUpdate.titulo
        cancion.artista = cancionUpdate.artista
        cancion.album = cancionUpdate.album
        cancion.año = cancionUpdate.año
        await Playlist.findOneAndUpdate( {nombre: nombrePlaylist}, lista )
        const listaResponse = await Playlist.findOne( {nombre: nombrePlaylist} )
        res.status(204).send(listaResponse)
        // let nombrePlaylist = req.params.nombre
        // const playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        // let tituloCancion = req.body
        // await Playlist.canciones.cancion.findOneAndUpdate({ titulo: tituloCancion}, cancion)
        // await cancion.artista.findOneAndUpdate({ titulo: tituloCancion})
        // await cancion.album.findOneAndUpdate({ titulo: tituloCancion})
        // await cancion.anio.findOneAndUpdate({ titulo: tituloCancion})
        // const cancionResponse = await Playlist.findOne({ titulo: tituloCancion})
        // res.send(cancionResponse)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/lists/:nombre/songs/:titulo', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        let tituloCancion = req.params.titulo
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = lista.canciones.find(x => x.titulo == tituloCancion)
        let indice = lista.canciones.indexOf(cancion)
        lista.canciones.splice(indice, 1)
        await Playlist.findOneAndUpdate( {nombre: nombrePlaylist}, lista )
        const listaResponse = await Playlist.findOne( {nombre: nombrePlaylist} )
        res.status(204).send(listaResponse)
        // let nombrePlaylist = req.params.nombre
        // let playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        // let tituloCancion = req.params.titulo
        // await Playlist.canciones.cancion.findOneAndRemove({ titulo: tituloCancion})
        // res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router