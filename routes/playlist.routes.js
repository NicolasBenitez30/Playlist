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
        res.send(playlists)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/lists/:nombre', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = Playlist.findOne({ nombre: nombrePlaylist})
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
        const cancion = await Playlist.canciones.findOne({ titulo: tituloCancion})
        res.send(cancion)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/lists/:nombre/songs', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        const cancion = req.body
        await Playlist.cancion.create(cancion)
        res.status(201).send(cancion)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.put('/lists/:nombre/songs/:titulo', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        let tituloCancion = req.body
        await Playlist.canciones.cancion.findOneAndUpdate({ titulo: tituloCancion}, cancion)
        await cancion.artista.findOneAndUpdate({ titulo: tituloCancion})
        await cancion.album.findOneAndUpdate({ titulo: tituloCancion})
        await cancion.anio.findOneAndUpdate({ titulo: tituloCancion})
        const cancionResponse = await Playlist.findOne({ titulo: tituloCancion})
        res.send(cancionResponse)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/lists/:nombre/songs/:titulo', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        let playlist = await Playlist.findOne({ nombre: nombrePlaylist})
        let tituloCancion = req.params.titulo
        await Playlist.canciones.cancion.findOneAndRemove({ titulo: tituloCancion})
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router