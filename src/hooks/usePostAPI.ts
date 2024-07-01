import { addpost } from '../services/postAPI'
import { usePostMutationWrapper } from '../services/query-wrappers'

// 포스트 추가하기 훅
export const useNewPost = () => {
  return usePostMutationWrapper(addpost)
}
