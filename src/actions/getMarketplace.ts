import { Action } from "actionhero";
import axios from 'axios';

const cyclr = axios.create({
    baseURL: 'https://api.us2.cyclr.com/v1.0',
    headers: {
      Authorization: 'Bearer abc123',
      'Content-Type': 'application/json',
      // 'X-Cyclr-Account': '181bbedd-d30d-444f-836e-c75d07b40f3d'
    }
  });


export default class GetMarketplace extends Action {
 constructor () {
   super()
   this.name = 'getMarketplace'
   this.description = 'I will return a Marketplace URL'
   this.outputExample = { marketplaceUrl: 'https://...' }
 }
 async run ({ response }: { response: any }) {
  try {
    const { data } = await cyclr.post(`/accounts/181bbedd-d30d-444f-836e-c75d07b40f3d/marketplace`, {
      MarketplaceId: '3'
    })
    const { MarketplaceUrl } = data
    response.marketplaceUrl = MarketplaceUrl
  } catch (error) {
    response.marketplaceUrl = error
  }
 }
}
