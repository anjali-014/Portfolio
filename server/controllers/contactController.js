const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");

/**
 * @desc   Submit a contact message
 * @route  POST /api/contact
 * @access Public
 */
const submitContact = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ip: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      data: {
        id: contact._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get all contact messages (admin use)
 * @route  GET /api/contact
 * @access Private (add auth middleware in production)
 */
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean(); // improves performance

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
};