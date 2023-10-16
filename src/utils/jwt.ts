import jwtDecode from "jwt-decode"

export const decodeToken = (token: string) => {
    console.log('-------------------------', token)
    return jwtDecode(token)
}