import { PrismaClient } from '@prisma/client'
import { FollowerRepository } from './follower.repository'
import { FollowerDTO } from '../dto'

export class FollowerRepositoryImpl implements FollowerRepository {
  constructor (private readonly db: PrismaClient) {}

  async followUserById (userId: any, ourUserId: any): Promise<FollowerDTO> {
    const follow = await this.db.follow.create({
      data: {
        followerId: ourUserId,
        followedId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    })
    console.log(follow)
    const followerDto: FollowerDTO = {
      id: follow.id,
      followerId: follow.followerId,
      followedId: follow.followedId,
      createdAt: follow.createdAt,
      updatedAt: follow.updatedAt,
      deletedAt: follow.deletedAt ?? undefined
    }
    return new FollowerDTO(followerDto)
  }

  async followUserAgainById (followerExisting: FollowerDTO): Promise<FollowerDTO> {
    await this.db.follow.updateMany({
      where: {
        followedId: followerExisting.followedId,
        followerId: followerExisting.followerId
      },
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    })

    const follower = await this.db.follow.findUnique({ where: { id: followerExisting.id } })
    return new FollowerDTO(follower as FollowerDTO)
  }

  async unfollowUserById (followerExisting: FollowerDTO): Promise<FollowerDTO> {
    console.log(followerExisting.followerId, followerExisting.followedId)
    await this.db.follow.updateMany({
      where: {
        followedId: followerExisting.followedId,
        followerId: followerExisting.followerId
      },
      data: {
        deletedAt: new Date()
      }
    })

    const follower = await this.db.follow.findUnique({ where: { id: followerExisting.id } })
    return new FollowerDTO(follower as FollowerDTO)
  }

  async getFollowerById (userId: any, ourUserId: any): Promise<FollowerDTO | null> {
    const followAlreadyExisting = await this.db.follow.findFirst({
      where: {
        followedId: userId,
        followerId: ourUserId
      }
    })
    return followAlreadyExisting ? new FollowerDTO(followAlreadyExisting as FollowerDTO) : null
  }
}
