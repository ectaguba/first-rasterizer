// routes/api/canvasElements.js

const express = require('express');
const router = express.Router();

// Load CanvasElement model
const CanvasElement = require('../../models/CanvasElement');

// @route   GET api/canvasElements/test
// @desc    Tests elements route
// @access  Public  
router.get('/test', (req, res) => res.send('element route testing!'));

// @route   GET api/canvasElements/
// @desc    Get all elements
// @access  Public
router.get('/', (req, res) => {
  CanvasElement.find()
    .then(elements => res.json(elements))
    .catch(err => res.status(404).json({ noelementsfound: 'No CanvasElements found' }));
});

// @route   GET api/canvasElements/:id
// @desc    Get a single element by id
// @access  Public
router.get('/:id', (req, res) => {
  CanvasElement.findById(req.params.id)
    .then(element => res.json(element))
    .catch(err => res.status(404).json({ noelementfound: 'No CanvasElement found' }));
});

// @route   POST api/canvasElements
// @desc    Add/save element
// @access  Public
router.post('/', (req, res) => {
  const newElement = new CanvasElement(req.body);

  newElement.save()
    .then(element => res.json({ msg: 'CanvasElement added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this element' }));
});

// @route   PUT api/canvasElements/:id
// @desc    Update element by id
// @access  Public
router.put('/:id', (req, res) => {
  CanvasElement.findByIdAndUpdate(req.params.id, req.body)
    .then(element => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/canvasElements/:id
// @desc    Delete element by id
// @access  Public
router.delete('/:id', (req, res) => {
  CanvasElement.findByIdAndDelete(req.params.id)
    .then(element => res.json({ mgs: 'CanvasElement entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such an element' }));
});

module.exports = router;
