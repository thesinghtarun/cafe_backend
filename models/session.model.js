const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },

  table_no: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },

  lastActivity: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const SESSION=mongoose.model("SESSION", sessionSchema);

module.exports = {SESSION};