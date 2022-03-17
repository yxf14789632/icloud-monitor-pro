import imRequest from '../index'
import { IDataType } from '../login/type'

export const listDeptsForSelect = () => {
  return imRequest.get<IDataType<any>>({
    url: '/api/v1/depts/select'
  })
}
