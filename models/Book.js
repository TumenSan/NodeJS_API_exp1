const {Schema, model} = require('mongoose')


const User = new Schema({
    book: {type: String, unique: true, required: true},
    author: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('Book', Book)