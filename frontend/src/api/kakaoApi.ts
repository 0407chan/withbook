import axios from 'axios'
import { FetchBookType } from '../types'

export const searchBook = async (
  bookName: string
): Promise<FetchBookType[]> => {
  const config = {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
    }
  }
  const payload = await axios.get(
    `https://dapi.kakao.com/v3/search/book?target=title&query=${bookName}`,
    config
  )
  return payload.data.documents
}
