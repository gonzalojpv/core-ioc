import { z } from 'zod'
import { JobInputSchema, ConfigVarSchema } from './schemas'
import Logger from '../utils/logger'

const TYPES = {
  JobProps: Symbol.for('JobInterface'),
  JobShareProps: Symbol.for('JobShareInterface'),
  XOiClientProps: Symbol.for('XOiClientInterface'),
  LoggerProps: Symbol.for('LoggerInterface'),
}

export { TYPES }

export type WorkOrderReadyEventJob = z.infer<typeof JobInputSchema>
export type ConfigVarsType = z.infer<typeof ConfigVarSchema>
