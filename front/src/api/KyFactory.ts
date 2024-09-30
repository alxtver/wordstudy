import { ElNotification } from 'element-plus'
import ky, { HTTPError } from 'ky'
import type { KyInstance } from 'ky'

class KyFactory {
  public kyInstance: KyInstance

  constructor() {
    this.kyInstance = ky.create({
      prefixUrl: '/',
      hooks: {
        beforeError: [
          async (error: HTTPError<{ message: string }>) => {
            const body = await error.response.json()
            const message = body && body.message ? body.message : error.message
            ElNotification({
              title: `Ошибка ${error.response.status}(${error.response.statusText})`,
              message: message,
              type: 'error',
              position: 'bottom-right'
            })
            return error
          }
        ]
      }
    })
  }
}

export const kyFactory = new KyFactory()
