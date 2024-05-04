const Customer = require("../models/Customers");
const mongoose = require("mongoose");

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single customer by id
const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ error: "No customer found" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCustomer = async (req, res) => {
  const { name, address, phone_number, email } = req.body;

  try {
    const customer = new Customer({ name, address, phone_number, email });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(400)
        .json({ error: "Email already exists. Please use a different email." });
    } else if (err.name === "ValidationError") {
      let messages = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({ error: messages.join(", ") });
    } else {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  }
};


// Delete a customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ error: "No customer found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const customer = await Customer.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({ error: "No customer found" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,
};
