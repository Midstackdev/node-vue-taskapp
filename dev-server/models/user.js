import mongoose from 'mongoose'
import { StringUtil } from '../utilities/string-util'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    first: String,
    last: String,
    password: String,
})

userSchema.set('timestamps', true)
userSchema.virtual('fullName').get(function() {
    const first = StringUtil.capitalize(this.first.toLowerCase())
    const last = StringUtil.capitalize(this.last.toLowerCase())
    return `${first} ${last}`
})

userSchema.statics.passwordMatches = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase()
    this.first = this.first.toLowerCase()
    this.last = this.last.toLowerCase()
    const unsafePassword = this.password
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(unsafePassword, salt)

    next()
})

export default mongoose.model('user', userSchema)