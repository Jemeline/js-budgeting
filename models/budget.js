const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    budgetType: {
      type: String,
      required: [true, 'Budget type required'],
      lowercase:true,
      enum: ['income', 'expense']
    },
    budgetAmount:{
        type: Number,
        required: [true, 'Amount required'],
        min: [0, 'Minimun amount is zero']
    },
    budgetDate:{
        type: Date,
        required: [true, 'Date required'],
    },
    budgetCategory:{
        type: String,
        required: [true, 'Category required'],
    },
    budgetSubcategory:{
        type: String,
    },
    budgetDescription:{
        type:String,
        required: [true, "Description required"],
    },
  });
  
const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;