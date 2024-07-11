export class FollowerDTO {
  constructor (follower: FollowerDTO) {
    this.id = follower.id
    this.followerId = follower.followerId
    this.followedId = follower.followedId
    this.createdAt = follower.createdAt
    this.updatedAt = follower.updatedAt
    this.deletedAt = follower.deletedAt
  }

  id: string
  followerId: string
  followedId: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
