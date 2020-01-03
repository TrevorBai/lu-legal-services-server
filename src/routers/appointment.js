const express = require('express')
const Appointment = require('../models/appointment')

const router = new express.Router()

router.post('/appointments', async (req, res) => {
  const appointment = new Appointment(req.body)

  try {
    await appointment.save()
    res.status(201).send(appointment)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.send(appointments)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/appointments/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const appointment = await Appointment.findById(_id)
    if (!appointment) {
      return res.status(404).send()
    }
    res.send(appointment)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)
    if (!appointment) {
      return res.status(404).send()
    }
    res.send(appointment)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/appointments/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['username', 
    'email', 
    'task', 
    'appointmentTime',
    'date',
    'message'
  ]
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }

  try {
    const appointment = await Appointment.findById(req.params.id)
    if (!appointment) {
      return res.status(404).send()
    }
    updates.forEach(update => appointment[update] = req.body[update])
    await appointment.save()
    res.send(appointment)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router