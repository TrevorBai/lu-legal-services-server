const request = require('supertest')
const app = require('../src/app')
const Appointment = require('../src/models/appointment')
const {
  appointmentOneId,
  appointmentTwoId,
  setupDatabase
} = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create an new appointment', async () => {
  const response = await request(app).post('/appointments').send({
    username: "Finish setting up backend",
    email: "bai@gmail.com",
    task: "landlord and tenant",
    appointmentTime: "3:00 PM",
    date: "JAN 02 2020",
    message: "N/P"
  }).expect(201)

  const appointment = await Appointment.findById(response.body._id)
  expect(appointment).not.toBeNull()

  expect(response.body).toMatchObject({
    username: "Finish setting up backend",
    email: "bai@gmail.com",
    task: "landlord and tenant",
    appointmentTime: "3:00 PM",
    date: "JAN 02 2020",
    message: "N/P"
  })

})

test('Should get all appointments', async () => {
  await request(app)
    .get('/appointments')
    .send()
    .expect(200)
})

test('Should get an appointment by Id', async () => {
  await request(app)
    .get(`/appointments/${appointmentOneId}`)
    .send()
    .expect(200)
})

test('Should delete an appointment by Id', async () => {
  await request(app)
    .delete(`/appointments/${appointmentOneId}`)
    .send()
    .expect(200)
})

test('Should not delete an appointment if not found', async () => {
  await request(app)
    .delete(`/appointments/${appointmentTwoId}`)
    .send()
    .expect(404)
})

test('Should update valid appointment field', async () => {
  await request(app)
    .patch(`/appointments/${appointmentOneId}`)
    .send({
      username: "Jess"
    })
    .expect(200)
  const appointment = await Appointment.findById(appointmentOneId)
  expect(appointment.username).toEqual('Jess')
})

test('Should not update invalid appointment fields', async () => {
  await request(app)
    .patch(`/appointments/${appointmentOneId}`)
    .send({
      name: "Jess"
    })
    .expect(400)
})
