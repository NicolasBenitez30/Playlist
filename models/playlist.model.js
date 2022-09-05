import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    canciones: {
        type: Array,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Playlist = mongoose.model('Playlist', playlistSchema)

export default Playlist