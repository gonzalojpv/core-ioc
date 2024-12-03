import 'reflect-metadata'
import { DIContainer } from './inversify.config'
import { TYPES } from './types'
import { JobInterface, XOiClientInterface } from './interfaces'

export const jobInstance = DIContainer.get<JobInterface>(TYPES.JobProps)
export const XOiClientInstance = DIContainer.get<XOiClientInterface>(TYPES.XOiClientProps)
