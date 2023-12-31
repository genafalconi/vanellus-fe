import Swal from "sweetalert2"
import { Methods } from "../helpers/constants"
import { request } from "./request"
import errorHandler from "../helpers/errorHandler"
import axios from "axios"

const VANELLUS_BE = process.env.REACT_APP_VANELLUS_BE
const VANELLUS_UPLOAD = process.env.REACT_APP_VANELLUS_UPLOAD

export const CREATE_TICKET = async (clientData) => {
  try {
    const res = await request(Methods.POST, `${VANELLUS_BE}/ticket/create`, null, clientData)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const UPLOAD_COMPROBANTE = async (comprobante) => {
  try {
    const config = {
      method: Methods.POST,
      url: `${VANELLUS_UPLOAD}/upload`,
      params: null,
      data: comprobante,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    const res = await axios(config)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const GET_TICKETS = async (prevent) => {
  try {
    const res = await request(Methods.GET, `${VANELLUS_BE}/ticket?prevent=${prevent}`, null, null)
    return res.data
  } catch (error) {
    console.log(error)
    return Swal.fire({
      title: 'Error',
      text: 'Intentalo devuelta'
    })
  }
}

export const VERIFY_TOKEN = async () => {
  try {
    const res = await request(Methods.GET, `${VANELLUS_BE}/ticket/verify-token`, null, null)
    return res?.data
  } catch (error) {
    return errorHandler(error)
  }
}

export const CREATE_QR = async (ticketsData) => {
  try {
    const res = await request(Methods.POST, `${VANELLUS_BE}/ticket/createQr`, null, ticketsData)
    return res?.data
  } catch (error) {
    return errorHandler(error)
  }
}

export const GET_PREVENTS = async () => {
  try {
    const res = await request(Methods.GET, `${VANELLUS_BE}/ticket/getPrevents`, null, null)
    return res.data
  } catch (error) {
    console.log(error)
    return Swal.fire({
      title: 'Error',
      text: 'Intentalo devuelta'
    })
  }
}
