const {
  REACT_APP_SERVER_BASE_URL
} = process.env || {}

export const CONFIG_SERVER = {
  BASE_URL: REACT_APP_SERVER_BASE_URL
}

export const AIPT_WEB_VMS_TOKEN = 'aipt-web-vms-token'

export const DATETIME_FORMAT = "HH:mm:ss DD-MM-YYYY"
export const DATETIME_FORMAT_REQUEST = "YYYY-MM-DD HH:mm:ss"
export const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/