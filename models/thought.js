const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Please enter a reaction.',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Please enter a username.'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dayjs(createdAtVal).format('MMM D, YYYY [at] h:mm a')
    }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Please enter a thought.',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dayjs(createdAtVal).format('MMM D, YYYY [at] h:mm a')
    },
    username: {
        type: String,
        required: 'Please enter a username.'
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;