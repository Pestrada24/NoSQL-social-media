const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.get('/', (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id });
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.id });
        const user = await User.findOneAndUpdate(
            { _id: thought.userId },
            { $pull: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
}
);

module.exports = router;