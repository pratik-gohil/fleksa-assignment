import { ILanguageData } from "./language-data.common.interfaces";
import { ITimings } from "./shop.common.interfaces";

export interface ISibling {
  address: {
    address: string
    area: string
    city: string
    floor: string
    postal_code: string
    lat: number
    lon: number
    availability: {
      has_delivery: {
        always: true
      }
      has_dinein: {
        always: true
      }
      has_pickup: {
        always: true
      }
      has_reservations: {
        always: false
      }
    }
  }
  name: string
  category_json: ILanguageData
  id: number
  logo: string
  urlpath: string
  timings: ITimings
}