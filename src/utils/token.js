import { jwtDecode } from 'jwt-decode'


function getToken(){
	return jwtDecode(localStorage.getItem('token'))
}
function saveToken(token){
	return localStorage.setItem('token',token)
}
function removeToken(token){
	return localStorage.removeItem('token')
}
export {saveToken,getToken,removeToken}