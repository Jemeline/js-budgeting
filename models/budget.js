const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Email required"],
      trim: true,
      lowercase: true
    },
    type: {
      type: String,
      required: [true, 'Category required'],
      lowercase:true,
      enum: ['income', 'expense']
    },
    amount:{
        type: Number,
        required: [true, 'Amount required'],
        min: [0, 'Minimun amount is zero']
    },
    date:{
        type:Date,
        required: [true, 'Date required'],
    },
    category:{
        type: [String],
        required: [true, 'Category required'],
    },
    subcategory:{
        type: [String],
        required: [true, 'Subcategory required'],
    },
    description:{
        type:String,
        required: [true, "Description required"],
    }
  });
  
const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;