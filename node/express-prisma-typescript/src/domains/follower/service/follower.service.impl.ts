import { ConflictException } from '@utils'
import { FollowerDTO } from '../dto'
import { FollowerRepository } from '../repository'
import { FollowerService } from './follower.service'

export class FollowerServiceImpl implements FollowerService {
  constructor (private readonly followerRepository: FollowerRepository) {}

  async followUser (userId: any, ourUserId: any): Promise<FollowerDTO> {
    const followerExisting = await this.followerRepository.getFollowerById(userId, ourUserId)
    if (followerExisting && followerExisting?.deletedAt === null) throw new ConflictException('User already following')
    let follower
    if (!followerExisting) {
      follower = await this.followerRepository.followUserById(userId, ourUserId)
      return follower
    }
    follower = await this.followerRepository.followUserAgainById(followerExisting)
    return follower
  }

  async unfollowUser (userId: any, ourUserId: any): Promise<FollowerDTO> {
    const followerExisting = await this.followerRepository.getFollowerById(userId, ourUserId)
    if (!followerExisting || followerExisting.deletedAt !== null) throw new ConflictException('User not being followed')
    const follower = await this.followerRepository.unfollowUserById(followerExisting)
    return follower
  }
}
