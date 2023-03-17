import { Action } from 'actionhero';
import axios from 'axios';

const cyclr = axios.create({
  baseURL: 'https://api.us2.cyclr.com/v1.0',
  headers: {
    Authorization: 'Bearer abc123',
    'Content-Type': 'application/json',
    // 'X-Cyclr-Account': '181bbedd-d30d-444f-836e-c75d07b40f3d'
  }
})

export default class GetLaunchUrl extends Action {
  constructor () {
    super()
    this.name = 'getLaunchUrl'
    this.description = 'I will return a Launch URL'
    this.outputExample = { url: 'https://...' }
  }

  async run ({ response }: { response: any }) {
    try {
      const { data } = await cyclr.post(`/accounts/f08f258d-25dc-4fd4-8e35-d46ae29fa3c6/launch`, {
        RunOnce: true,
        AutoInstall: true,
        SingleInstall: true,
        Start: true,
        InlineOAuth: true,
        Wizard: true,
        DisplayDescriptions: true,
        AccountName: 'Demo Account',
        AccountDescription: 'Demo Account Description'
      })
      const { LaunchUrl } = data
      response.url = LaunchUrl
    }
    catch (error) {
      response.url = error
    }
  }
}
