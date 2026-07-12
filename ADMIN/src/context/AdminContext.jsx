import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')
    const [doctors, setdoctors] = useState([])
    const [appointmentList, setAppointmentList] = useState([])
    const [contactUsList, setContactUsList] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', { headers: { adminToken } })
            if (data.success) {

                setdoctors(data.doctors)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getContactUsRequest = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-contact-requests',{ headers: { adminToken } })
            
            if (data.success) {
                
                setContactUsList(data.contactUsList)
                return true

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const updateContactStatus = async (contactId, status) => {
        try {

            const { data } = await axios.post(
                backendUrl + "/api/admin/update-contact-status",
                { contactId, status },
                {
                    headers: { adminToken }
                }
            );

            if (data.success) {
                toast.success(data.message);
                getContactUsRequest();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };


    const deleteContactRequest = async (contactId) => {
        try {

            const { data } = await axios.post(
                backendUrl + "/api/admin/delete-contact-request",
                { contactId },
                {
                    headers: { adminToken }
                }
            );

            if (data.success) {
                toast.success(data.message);
                getContactUsRequest();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };


    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { adminToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointment-list', { headers: { adminToken } })
            if (data.success) {
                setAppointmentList(data.appointmentList)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { adminToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { adminToken } })
            if (data.success) {
                setDashData(data.dashData)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        adminToken, setAdminToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointmentList, setAppointmentList,
        getAllAppointments,
        cancelAppointment,
        getDashData, dashData, contactUsList,
        getContactUsRequest,
        updateContactStatus,
        deleteContactRequest,
    }

    return (
        <AdminContext.Provider value={value} >
            {props.children}
        </AdminContext.Provider>
    )

}


export default AdminContextProvider