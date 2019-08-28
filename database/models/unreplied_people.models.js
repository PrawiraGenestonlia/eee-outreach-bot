const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnrepliedMessageModel = new Schema({
  unreplied_people: [
    {
      name: String,
      chatId: Number,
      message: [String]
    }]
});

// const UnrepliedMessageModel = new Schema({ type: [UnrepliedMessageSingleModel] });

module.exports = mongoose.model('UnrepliedMessageModel', UnrepliedMessageModel);