import { kyFactory } from './KyFactory'
import type { KyInstance, Options, ResponsePromise } from 'ky'

/**
 * Класс-обёртка над Api
 */
export class AbstractApi {
  /** Основная часть урлы для АПИ */
  private mainUrl: string = ''

  /** Мапа для прерывания запросов */
  protected abortControllerMap: Record<string, AbortController> = {}

  constructor(public kyInstance: KyInstance = kyFactory.kyInstance) {}

  /**
   * GET-запрос
   * @param additionalUrl урл
   * @param config конфиг
   */
  protected get(additionalUrl: string, config?: Options): ResponsePromise {
    config = this.addAbortSignal({ additionalUrl, config, abort: true })
    config.retry = 0
    config.headers = [['Access-Control-Allow-Origin', '*']]
    return this.kyInstance.get(this.getFullUrl(additionalUrl), config)
  }

  /**
   * PUT-запрос
   * @param additionalUrl урл
   * @param config конфиг
   */
  protected put(additionalUrl: string, config?: Options): ResponsePromise {
    return this.kyInstance.put(this.getFullUrl(additionalUrl), config)
  }

  /**
   * POST-запрос
   * @param additionalUrl урл
   * @param config конфиг
   */
  protected post(additionalUrl: string, config?: Options): ResponsePromise {
    config = this.addAbortSignal({ additionalUrl, config, abort: true })
    config.retry = 0
    return this.kyInstance.post(this.getFullUrl(additionalUrl), config)
  }

  /**
   * DELETE-запрос
   * @param additionalUrl урл
   * @param config конфиг
   */
  protected delete(additionalUrl: string, config?: Options): ResponsePromise {
    return this.kyInstance.delete(this.getFullUrl(additionalUrl), config)
  }

  /**
   * Получить полный урл
   * @param additionalUrl дополнительный урл
   * @private
   */
  protected getFullUrl(additionalUrl: string): URL {
    return new URL('http://localhost:3000/' + this.mainUrl + additionalUrl)
  }

  private addAbortSignal({
    additionalUrl,
    config,
    abort = false
  }: {
    additionalUrl: string
    config?: Options
    abort?: boolean
  }): Options {
    const fullUrl = this.getFullUrl(additionalUrl)
    const params = config?.searchParams ? JSON.stringify(config.searchParams) : ''
    const fullUrlWithParams = fullUrl + params
    const currentAbortController = this.abortControllerMap[fullUrlWithParams]
    if (currentAbortController) {
      currentAbortController.abort()
      delete this.abortControllerMap[fullUrlWithParams]
    }
    if (abort) {
      this.abortControllerMap[fullUrlWithParams] = new AbortController()
    }
    config = {
      ...config,
      signal: this.abortControllerMap[fullUrlWithParams].signal
    }
    return config
  }
}
