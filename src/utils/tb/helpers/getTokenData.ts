import { jwtDecode, JwtPayload } from "jwt-decode"

export const getTokenData = (
  token: string
): JwtPayload & {
  userType: string
} => {
  let data = jwtDecode(token) as any

  return {
    ...data,
    userType: data.userType.split("_")[1],
  }
}
