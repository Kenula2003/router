const express = require('express');
const Joi = require('joi'); 
const router = express.Router();


let planets = [
  { id: 1, name: 'Earth' },
  { id: 2, name: 'Mars' }
];

const planetSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

router.get('/', (req, res) => {
  res.status(200).json(planets);
});

router.get('/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));

  if (!planet) {
    return res.status(404).json({ msg: 'Planet not found' });
  }
res.status(200).json(planet);
});


router.post('/', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const newPlanet = {
    id: planets.length + 1, 
    name: req.body.name
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});


router.put('/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));

  if (!planet) {
    return res.status(404).json({ msg: 'Planet not found' });
  }

  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }


  planet.name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
});


router.delete('/:id', (req, res) => {
  const planetIndex = planets.findIndex(p => p.id === parseInt(req.params.id));

  if (planetIndex === -1) {
    return res.status(404).json({ msg: 'Planet not found' });
  }


  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: 'Planet deleted successfully' });
});

module.exports = router;
