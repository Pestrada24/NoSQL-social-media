const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
}
);

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
}
);

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
}
);

router.put('/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const updatedUserData = req.body;

        const updateUser = await User.findByIdAndUpdate(userId, updatedUserData, {new: true});

        if(!updateUser){
            res.status(404).json({message: 'No user found with this id!'});
            return;
        }
        res.json(updateUser);
    } catch(err){
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });

        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
}
);

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
}
);

module.exports = router;