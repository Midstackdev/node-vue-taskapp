import { StringUtil } from '../../utilities/string-util'
import User from '../../models/user'

export function index(req, res) {
    const validation = validateIndex(req.body)

    if(!validation.isValid) {
        return res.status(400).json({ message: validation.message })
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last
    })

    user.save().then((user) => {
        return res.status(201).json({ success: true, data: user })
    })
    .catch(error => {
        if(error.code === 11000) {
            return res.status(403).json({ errors: 'Username is already taken.'})
        }

        return res.status(500).json({ 
            errors: {
                message: 'Failed to register user.',
                mongo: error
            } 
        })
    })
}

function validateIndex(body) {
    let errors = ''
    if(StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. '
    }

    if(StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. '
    }

    if(StringUtil.isEmpty(body.first)) {
        errors += 'Firstname is required. '
    }

    if(StringUtil.isEmpty(body.last)) {
        errors += 'Lastname is required. '
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}