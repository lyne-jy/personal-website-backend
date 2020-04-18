const mongoose = require('mongoose');
const Joi = require('joi');

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now() + 8*60*60*1000
    }
});

const Message = mongoose.model("Message", messageSchema);

function validateMessage(message) {
    const schema = {
        message: Joi.string().required()
    };

    const result = Joi.validate(message, schema);
    return result;
}

module.exports.validateMessage = validateMessage;
module.exports.Message = Message;
module.exports.messageSchema = messageSchema;