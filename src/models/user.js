const mongoose = require('mongoose')
const validator = require('validator')
const passwordValidator = require('password-validator')
const bcrypt = require('bcryptjs')

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
    }
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

const User = mongoose.model('User', userSchema)

module.exports = User