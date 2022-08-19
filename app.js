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
                nombre: "Perla",
                artista: "C.R.O",
                album: "Perla",
                anio: "2018"
            },
            {
                nombre: "Me voy a olvidar",
                artista: "T&K",
                album: "El Libro Negro",
                anio: "2018"
            },
            {
                nombre: "Ly$",
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
    let playlistN = response.send(playlists.filter(x => x.nombre == nombre))
    if (playlistN.nombre == null) {
        response.status(400).send("nombre de lista incorrecto")
    }
    let playlistD = request.params.descripcion
    if (playlistD.descripcion == null) {
        response.status(400).send("descripcion de la lista no existe")
    }
    response.send(playlistN, playlistD)
})

app.listen(port, () => {
    console.log(`Escuchando peticiones en ${port}`)
})