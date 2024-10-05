import { accessKey } from '@/api/devserverconf'
import ky from 'ky'

class Unsplash {
  private key = accessKey

  public async getImageUrl(query: string): Promise<string> {
    const data = await ky.get(
      `https://api.unsplash.com/photos/random/?client_id=${this.key}&query=${query}`
    ).json()
    return (data as any).urls.regular as string
  }
}

export default new Unsplash()
