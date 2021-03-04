const Station = require('../models/station');

exports.getAllStation = (req, res) => {
    Station.find({})
        .exec((error, stations) => {
            if (error) return res.status(400).json({ error });
            if (stations) {
                res.status(200).json({ stations });
            }
        });
}

exports.getStation = (req, res) => {
    Station.findById(req.body.stationId)
        .exec((error, station) => {
            if (error) return res.status(400).json({ error });
            if (station) {
                res.status(200).json({ station });
            }
        })
}

exports.saveStation = (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const status = req.body.status;

    const newStation = new Station({
        name,
        location,
        status
    });

    newStation.save()
        .then(() => res.json('Station added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateStation = (req, res) => {
    console.log(req.body);
    Station.findById(req.body._id)
        .exec((error, station) => {
            if (error) return res.status(400).json({ error });
            if (station) {
                const name = req.body.name;
                const location = req.body.location;
                const status = req.body.status;

                const update = {
                    name,
                    location,
                    status
                }

                Station.findOneAndUpdate({ "_id": req.body._id }, update)
                    .exec((error, _station) => {
                        if (error) return res.status(400).json({ error });
                        if (_station) {
                            return res.status(201).json({ station: _station });
                        }
                    });
            }
        })
}
