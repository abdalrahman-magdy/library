import mongoose,{ Schema, model } from 'mongoose'

const schema = new Schema({
    name :{type:String, required:true}, 
    bio:{type:String},
    birthDate: {type:Date},
    books:[{type: mongoose.Types.ObjectId,ref:'Book'}]
},{
    versionKey:false
})


export const Author = model('Author',schema)