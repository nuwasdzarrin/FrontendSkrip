export const APIENDPOINT = "http://localhost:58187/api";

export const getHeader = function () {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    const headers = {
        'Authorization': 'Bearer ' + authUser.data.access_token
       }
       return {headers}
}