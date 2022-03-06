const express = require('express');
const budgetModel = require('../models/budget');
const app = express();
const { check } = require('express-validator');
const mongoose = require("mongoose");

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
	const budget = new budgetModel(req.body);
	try {
		await budget.save();
		res.send(budget);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.delete('/budget/:id', async (req, res) => {
	try {
		const budget = await budgetModel.findByIdAndDelete(req.params.id)
		if (!budget) res.status(404).send("No budget item found")
		res.status(200).send()
	} catch (err) {
		res.status(500).send(err)
	}
});

app.patch('/budget/:id', async (req, res) => {
	try {
		const budget = await budgetModel.findByIdAndUpdate(req.params.id, req.body)
		await budget.save()
		res.send(budget)
	} catch (err) {
		console.log(err);
		res.status(500).send(err)
	}
});

const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

app.post('/budget-total-expenses/:id', async (req, res) => {
	const startDate = new Date(new Date(req.body.startDate).setUTCHours(0, 0, 0, 0));
	const endDate = new Date(req.body.endDate);
	console.log(startDate,req.body.endDate)
	try {
		const budget = await budgetModel.aggregate([
			{ $match: { budgetDate: { $lte: endDate, $gte: startDate } } },
			{
				$group : {
					"_id": "$budgetType",
					"total" : {
						$sum : "$budgetAmount"
					}
				}
			}
		]);
		console.log(budget);
		res.send(convertArrayToObject(budget,"_id"));
	} catch (err) {
		console.log(err)
		res.status(500).send(err);
	}
});

app.post('/budget-expenses-by-category/:id', async (req, res) => {
	const startDate = new Date(new Date(req.body.startDate).setUTCHours(0, 0, 0, 0));
	const endDate = new Date(req.body.endDate);
	const ObjectId = mongoose.Types.ObjectId;
	const id = ObjectId(req.params.id);
	console.log(req.params.id)
	try {
		const budget = await budgetModel.aggregate([
			{
				$match: { 
					budgetDate: { $lte: endDate, $gte: startDate },
					budgetType: { $eq: "expense" },
					"_userId": id,
				}
			},
			{
				$group : {
					"_id": "$budgetCategory",
					"total" : {
						$sum : "$budgetAmount"
					}
				}
			}
		]);
		res.send(budget.map(ele => {
			return {
				name: ele["_id"],
				total: ele.total,
			}
		}));
	} catch (err) {
		console.log(err)
		res.status(500).send(err);
	}
});

module.exports = app;