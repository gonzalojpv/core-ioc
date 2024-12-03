// file inversify.config.ts

import { Container } from 'inversify'
import { TYPES } from './types'
import { JobInterface, JobShareInterface, XOiClientInterface, LoggerInterface } from './interfaces'
import { Job, JobShare, XOiClient } from './client'
import Logger from '../utils/logger'

const DIContainer = new Container()

DIContainer.bind<JobInterface>(TYPES.JobProps).to(Job)
DIContainer.bind<JobShareInterface>(TYPES.JobShareProps).to(JobShare)
DIContainer.bind<XOiClientInterface>(TYPES.XOiClientProps).to(XOiClient)
DIContainer.bind<LoggerInterface>(TYPES.LoggerProps).to(Logger)

export { DIContainer }
