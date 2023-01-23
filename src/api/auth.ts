import { api } from '@/api/index'

export function getSessionToken() {
  return api.get('https://opentdb.com/api_token.php?command=request')
}
