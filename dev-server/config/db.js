import mongoose from 'mongoose'

export function connectToDB() {
    mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB Connected')
    })
    .catch(error => {
        console.log('Unable to connect to DB')
        throw error
    })
}