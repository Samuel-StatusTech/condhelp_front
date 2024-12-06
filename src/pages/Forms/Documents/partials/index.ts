/*
 *  Provider
 */
import { basicProvider } from "./provider/basic"
import { extraProvider } from "./provider/extra"

export const formPartials = {
  provider: {
    basic: basicProvider,
    extra: extraProvider,
  },
}
