import { FollowerDTO } from '../dto'

export interface FollowerService {
  followUser: (userId: any, ourUserId: any) => Promise<FollowerDTO>
  unfollowUser: (userId: any, ourUserId: any) => Promise<FollowerDTO>
}
