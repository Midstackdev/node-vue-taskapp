import { StringUtil } from '../../utilities/string-util'
import User from '../../models/user'

export function index(req, res) {
    const validation = validateIndex(req.body)

    if(!validation.isValid) {
        return res.status(400).json({ message: validation.message })
    }

    User.findOne({ username: req.body.username.toLowerCase() }).then(user => {
        if(!user) {
            return res.status(401).json({ errors: 'No user was found.'})
        }

        const passwordMatch = User.passwordMatches(req.body.password, user.password)
        if(!passwordMatch) {
            return res.status(401).json({ errors: {message: 'Password invalid.'}})
        }

        return res.status(200).json({ success: true, data: user })
    })
    .catch(error => {
        return res.status(500).json({ 
            errors: {
                message: 'Failed to login user.',
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

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}