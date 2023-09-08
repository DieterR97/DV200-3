const express = require('express')
const router = require("express").Router();
const { User, validate } = require("../models/users");

const bcrypt = require("bcrypt");

// Register a User
router.post('/api/registerUser/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//Get all
router.get('/api/getUsers/', async (req, res) => {
    const findUser = await User.find()
    // old
    // const findUser = await UserSchema.find()
    res.json(findUser)
})

// Read a single user
router.get('/api/user/:email', async (req, res) => {
    try {
        var query = { email: req.params.email };
        const user = await User.findOne(query);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
