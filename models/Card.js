const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
    name: {type: String, required: true, minlength: 1, maxlength: 10},
    race: {type: String, required: true, minlength: 2, maxlength: 12},
    classe: {type: String, required: true, minlength: 2, maxlength: 12},
    avatarHead: {type: String, required: true},
    avatarEyes: {type: String, required: true},
    avatarMouth: {type: String, required: true},
    avatarHair: {type: String, required: true},
    avatarBody: {type: String, required: true},
    avatarHelmet: {type: String, required: true},
    hitPoints: { type: Number, min: 0, max: 100, required: true},
    attackPower: { type: Number, min: 0, max: 100, required: true},
    specialSkill: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId}
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
}
)

const Card = mongoose.model('Card', cardSchema)

module.exports = Card