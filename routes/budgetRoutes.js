const express = require('express');
const { check } = require('express-validator');
const budgetModel = require('../models/budget');

const app = express();

app.get('/budget-by-user/:id', async (req, res) => {
  const budget = await budgetModel.find({ _userId: req.params.id });
  try {
    res.send(budget);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/budget-by-id/:id', async (req, res) => {
  const budget = await budgetModel.find({ _id: req.params.id });
  try {
    res.send(budget);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/budget', [
  check('_userId', '_userId required').not().isEmpty(),
  check('budgetType', 'Budget type required').not().isEmpty(),
  check('budgetAmount', 'Amount required').not().isEmpty(),
  check('budgetDate', 'Budget date required').not().isEmpty(),
  check('budgetCategory', 'Category required').not().isEmpty(),
  check('budgetDescription', 'Description required').not().isEmpty(),
], async (req, res) => {
  const budget = await budgetModel.create(req.body);
  try {
    res.send(budget);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/budget/:id', async (req, res) => {
  try {
    const budget = await budgetModel.findByIdAndDelete(req.params.id);
    if (!budget) res.status(404).send('No budget item found');
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/budget/:id', async (req, res) => {
  try {
    const budget = await budgetModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(budget);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = app;
