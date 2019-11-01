const mongoose = require('mongoose')
const validator = require('validator')
const passwordValidator = require('password-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Setup our password validator schema
var passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Please enter a valid email.')
            }
        }
    },
    password: {
        type:String,
        required: true,
        minlength: 8,
        trim:true,
        validate(value) {
            const errors = passwordSchema.validate(value, {list: true})
            if(errors.length > 0) {
                throw new Error('Password does not meet requirements about: ' + errors)
            }
        }
    },
    samples: {
        type: mongoose.Types.ObjectId,
        ref:'Sample'  
    },
    tokens: [{
            token: {
                type:String,
                required: true
            }
        }]
}, {
    timestamps: true
}
)

userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
       user.password = await bcrypt.hash(this.password, 8)
    }   
    next()
})

userSchema.methods.toJSON = function() {
    const user = this
    const obj = user.toObject()

    delete(obj.password)
    delete(obj.tokens)
    return obj
}

userSchema.statics.getByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if(!user) {
        throw new Error('Cannot login with those credentials')
    }
    const legit = await bcrypt.compare(password, user.password)
    if(legit) {
        return user
    }
    else {
        throw new Error('Cannot login with those credentials')
    }
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' })

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


userSchema.statics.getUserByToken = async(token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET)

        var decoded = jwt.decode(token, {complete: true});
        const user = await User.findById(decoded.payload._id)
        
        if(!user) {
            throw new Error('Cannot find a user with this token')
        }
        return user
    } catch(e) {
        console.log(e)
        throw new Error('Cannot find a user with this token')
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User