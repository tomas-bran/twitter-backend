import { Router, Request, Response } from 'express'
import httpStatus from 'http-status'
import 'express-async-errors'
import { FollowerService, FollowerServiceImpl } from '../service'
import { FollowerRepositoryImpl } from '../repository'
import { db } from '@utils'

export const followerRouter = Router()
const service: FollowerService = new FollowerServiceImpl(new FollowerRepositoryImpl(db))

followerRouter.post('/follow/:user_id', async (req: Request, res: Response) => {
  const { userId: ourUserId } = res.locals.context
  const { user_id: userId } = req.params
  const follower = await service.followUser(userId, ourUserId)

  res.status(httpStatus.OK).json(follower)
})

followerRouter.post('/unfollow/:user_id', async (req: Request, res: Response) => {
  const { userId: ourUserId } = res.locals.context
  const { user_id: userId } = req.params
  const follower = await service.unfollowUser(userId, ourUserId)

  res.status(httpStatus.OK).json(follower)
})
