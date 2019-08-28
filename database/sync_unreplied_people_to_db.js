const unreplied_people_model = require('./models/unreplied_people.models');
const util = require('util');

async function sync_unreplied_people_db(unreplied_people) {
  // console.log("sync with database");
  const temp2 = await unreplied_people_model.findOne();
  await unreplied_people_model.deleteOne({ _id: temp2._id });
  const temp = new unreplied_people_model();
  temp.unreplied_people = unreplied_people;
  // console.log("temp", temp);
  await temp.save()
}

async function get_unreplied_people_db(unreplied_people) {
  let data = await unreplied_people_model.find();
  unreplied_people = data[0].unreplied_people;
  // console.log("get: ");
  // console.log(util.inspect(unreplied_people, false, null, true));
}

module.exports = { sync_unreplied_people_db, get_unreplied_people_db };