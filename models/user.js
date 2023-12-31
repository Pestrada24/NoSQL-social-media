const { Schema, model, types } = require('mongoose');

const userSchema = new Schema({
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter a username.',
            trim: true
        },
        email: {
            type: String,
            required: 'Please enter an email.',
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;