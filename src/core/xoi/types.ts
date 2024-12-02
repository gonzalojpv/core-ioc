import { z } from 'zod'
import { WorkOrderReadyEventSchema } from './schemas'

const TYPES = {
  JobProps: Symbol.for('JobInterface'),
  JobShareProps: Symbol.for('JobShareInterface'),
  XOiClientProps: Symbol.for('XOiClientInterface'),
}

export { TYPES }

export type WorkOrderReadyEvent = z.infer<typeof WorkOrderReadyEventSchema>