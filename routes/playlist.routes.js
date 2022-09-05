import express from 'express'

const router = express.Router()

import Playlist from '../models/playlist.model'

//endpoints

router.post('/lists', (req, res) => {
    let playlist = req.body
    if (playlist.nombre == null) {
        res.status(400).send("nombre de lista incorrecto")
    }
    playlists.push(req.body)
    res.status(201).send(playlist)
})

    .get('/lists', (req, res) => {
    res.send(playlists)
})

router.get('/lists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(400).send("nombre de lista incorrecto")
        return
    }
    res.send(playlist)
})

router.put('/lists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(400).send("nombre de lista incorrecto")
        return
    }
    playlist.descripcion = req.body.descripcion
    res.send(playlist)
})

router.delete('/lists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(400).send("nombre de lista incorrecto")
        return
    }
    let eliminar = playlists.indexOf(playlist)
    playlists.splice(eliminar, 1)
    res.send("Se elimino la Playlist")

})

router.get('/lists/:nombre/songs', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(400).send("nombre de lista incorrecto")
        return
    }
    res.send(playlist.canciones)
})

router.get('/lists/:nombre/songs/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(400).send("nombre de lista incorrecto")
        return
    }
    let titulo = req.params.titulo
    let cancion = playlist.canciones.find(x => x.titulo == titulo)
    if (cancion == null) {
        res.status(400).send("nombre de cancion incorrecto")
        return
    }
    res.send(cancion)
})

router.post('/lists/:nombre/songs', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(404).send("nombre de lista incorrecto")
        return
    }
    let cancion = req.body
    if (cancion.titulo == null) {
        res.status(400).send("nombre de cancion incorrecto")
        return
    }
    playlist.canciones.push(req.body)
    res.status(201).send(playlist.canciones)
})

router.put('/lists/:nombre/songs/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(404).send("nombre de lista incorrecto")
        return
    }
    let titulo = req.params.titulo
    let cancion = playlist.canciones.find(x => x.titulo == titulo)
    if (cancion.titulo == null) {
        res.status(400).send("nombre de cancion incorrecto")
        return
    }
    cancion.artista = req.body.artista
    cancion.album = req.body.album
    cancion.anio = req.body.anio
    res.send(cancion)
})

router.delete('/lists/:nombre/songs/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(404).send("nombre de lista incorrecto")
        return
    }
    let titulo = req.params.titulo
    let cancion = playlist.canciones.find(x => x.titulo == titulo)
    if (cancion.titulo == null) {
        res.status(400).send("nombre de cancion incorrecto")
        return
    }
    let eliminar = playlist.canciones.indexOf(cancion)
    playlist.canciones.splice(eliminar, 1)
    res.send("Se elimino la Cancion")
})

export default router