import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];
  newLane.id = uuid();

  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.notes.forEach(note => {
      Note.remove({ _id: note });
    });

    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function editName(req, res) {
  if (!req.body.id) {
    res.status(403).end();
  }

  Lane.findOneAndUpdate({ id: req.body.id }, { name: req.body.name }, { new: true }).exec((err, updated) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(updated);
  });
}
