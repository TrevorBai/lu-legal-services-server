const mongoose = require('mongoose')
const Appointment = require('../../src/models/appointment')

const appointmentOneId = new mongoose.Types.ObjectId()
const appointmentTwoId = new mongoose.Types.ObjectId()
const appointmentOne = {
  _id: appointmentOneId,
  username: "Dummy user one",
  email: "one@gmail.com",
  task: "landlord and tenant",
  appointmentTime: "3:00 PM",
  date: "JAN 02 2020",
  message: "N/P"
}

const setupDatabase = async () => {
  await Appointment.deleteMany()
  await new Appointment(appointmentOne).save()
}

module.exports = {
  appointmentOneId,
  appointmentTwoId,
  appointmentOne,
  setupDatabase
}