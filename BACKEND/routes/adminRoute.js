import express from 'express'
import { addDoctor, adminAllAppointmentList, adminDashboard, allContactUsRequest, allDoctors, appointmentCancelByAdmin, deleteContactRequest, loginAdmin, updateContactStatus } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const Router = express.Router()

Router.post('/add-doctor', authAdmin, upload.single("image"), addDoctor)
Router.post('/login', loginAdmin)
Router.post('/all-doctors',authAdmin , allDoctors)
Router.get("/all-contact-requests", authAdmin, allContactUsRequest);
Router.post("/update-contact-status", authAdmin, updateContactStatus);
Router.post("/delete-contact-request", authAdmin, deleteContactRequest);
Router.post('/change-availability',authAdmin , changeAvailablity)
Router.get('/appointment-list',authAdmin , adminAllAppointmentList)
Router.post('/cancel-appointment',authAdmin , appointmentCancelByAdmin)
Router.get('/dashboard',authAdmin , adminDashboard)

export default Router