const express = require('express');
const budgetModel = require('../models/budget');
const app = express();

app.get('/budget/:email', async (req, res) => {
    const budget = await budgetModel.find({email:req.params.email});
    try {
      res.send(budget);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.post('/budget', async (req, res) => {
    const budget = new budgetModel(req.body);
    
    try {
      await budget.save();
      res.send(budget);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.delete('/budget/:id', async (req, res) => {
    try {
      const budget = await budgetModel.findByIdAndDelete(req.params.id)
  
      if (!budget) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
});

app.patch('/budget/:id', async (req, res) => {
    try {
      await budgetModel.findByIdAndUpdate(req.params.id, req.body)
      await budgetModel.save()
      res.send(budget)
    } catch (err) {
      res.status(500).send(err)
    }
});
  
module.exports = app;