import { FollowerDTO } from '../dto'

export interface FollowerRepository {
  followUserById: (userId: any, ourUserId: any) => Promise<FollowerDTO>
  followUserAgainById: (followerExisting: FollowerDTO) => Promise<FollowerDTO>
  unfollowUserById: (followerExisting: FollowerDTO) => Promise<FollowerDTO>
  getFollowerById: (userId: any, ourUserId: any) => Promise<FollowerDTO | null>
}
