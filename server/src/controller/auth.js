const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Station = require('../models/station');

exports.signup = (req, res) => {

    User.findOne({ primary: req.body.primary })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User already registered'
            });
            const { firstName, lastName, primary, password } = req.body;
            const _user = new User({ firstName, lastName, primary, password });
            console.log(_user);
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    })
                }

                if (data) {
                    return res.status(201).json({
                        message: "User created Successfully."
                    })
                }
            })
        })
}

exports.signin = (req, res) => {
    User.findOne({ primary: req.body.primary })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, primary, secondary,
                        password, favorite_charging_stations, active_charging_stations } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, primary, secondary,
                            password, favorite_charging_stations, active_charging_stations
                        }
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Invalid Password"
                    })
                }
            } else {
                return res.status(400).json({ message: 'Something went wrong' })
            }
        })
}

exports.getUser = async (req, res) => {

    const user = await User.findOne({ _id: req.user._id }).exec();
    let favSta = [];
    let actSta = [];
    for (i = 0; i < user.favorite_charging_stations.length; i++) {
        favSta.push(await Station.findOne({ _id: user.favorite_charging_stations[i].station }).exec())
    }
    for (i = 0; i < user.active_charging_stations.length; i++) {
        actSta.push(await Station.findOne({ _id: user.active_charging_stations[i].station }).exec())
    }
    res.status(200).json({ user, favSta, actSta });
}

exports.updateUser = (req, res) => {
    User.findOne({ _id: req.user._id })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                console.log(user);
                let condition, update;
                condition = { _id: req.user._id };
                update = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    primary: req.body.primary,
                    secondary: req.body.secondary,
                    favorite_charging_stations: req.body.favorite_charging_stations,
                    active_charging_stations: req.body.active_charging_stations
                }
                User.findOneAndUpdate(condition, update)
                    .exec((error, _user) => {
                        if (error) return res.status(400).json({ error });
                        if (_user) {
                            return res.status(201).json({ user: _user });
                        }
                    });
            }
        })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout Successfully..!'
    })
}