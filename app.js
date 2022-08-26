const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

const port = 7003

let playlists = [
    {
        nombre: "tranki",
        descripcion: "chill's track's",
        canciones: [
            {
                titulo: "Perla",
                artista: "C.R.O",
                album: "Perla",
                anio: "2018"
            },
            {
                titulo: "Me voy a olvidar",
                artista: "T&K",
                album: "El Libro Negro",
                anio: "2018"
            },
            {
                titulo: "Ly$",
                artista: "C.R.O & Franky Style",
                album: "MBD Crew",
                anio: "2018"
            }
        ]
    }
]

//endpoints

app.post('/lists', (request, response) => {
    let playlist = request.body
    if (playlist.nombre == null) {
        response.status(400).send("nombre de lista incorrecto")
    }
    playlists.push(request.body)
    response.status(201).send(playlist)
})

app.get('/lists', (request, response) => {
    response.send(playlists)
})

app.get('/lists/:nombre', (request, response) => {
    let nombre = request.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        response.status(400).send("nombre de lista incorrecto")
        return
    }
    response.send(playlist)
})

app.put('/lists/:nombre', (request, response) => {
    let nombre = request.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        response.status(400).send("nombre de lista incorrecto")
        return
    }
    playlist.descripcion = request.body.descripcion
    response.send(playlist)
})

app.delete('/lists/:nombre', (request, response) => {
    let nombre = request.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        response.status(400).send("nombre de lista incorrecto")
        return
    }
    let eliminar = playlists.indexOf(playlist)
    playlists.splice(eliminar, 1)
    response.send("Se elimino la Playlist")

})

app.get('/lists/:nombre/songs', (request, response) => {
    let nombre = request.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        response.status(400).send("nombre de lista incorrecto")
        return
    }
    response.send(playlist.canciones)
})

app.get('/lists/:nombre/songs/:titulo', (request, response) => {
    let nombre = request.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        response.status(400).send("nombre de lista incorrecto")
        return
    }
    let titulo = request.params.titulo
    let cancion = playlist.canciones.find(x => x.titulo == titulo)
    if (cancion == null) {
        response.status(400).send("nombre de cancion incorrecto")
        return
    }
    response.send(cancion)
})

app.post('/lists/:nombre/songs', (request, response) => {
    let nombre = request.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        response.status(404).send("nombre de lista incorrecto")
        return
    }
    let cancion = request.body
    if (cancion.titulo == null) {
        response.status(400).send("nombre de cancion incorrecto")
        return
    }
    playlist.canciones.push(request.body)
    response.status(201).send(playlist.canciones)
})

// app.put('', (request, response) => {

// })

app.listen(port, () => {
    console.log(`Escuchando peticiones en ${port}`)
})