import { ajax } from 'utils'

export const getCity = ajax.fetchJSONByPost('/region/getThreelevel.do','','java')