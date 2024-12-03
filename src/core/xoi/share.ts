import { injectable, inject } from 'inversify'
import { JobShareInterface } from './interfaces'
import Logger from '../utils/logger'
import { parseGqlErrors } from '../utils/helper'
import { Sdk, CreateJobShareInput } from '../../generated/graphql'
import { GraphQLErrorSchema } from './schemas'
import { TYPES } from './types'

@injectable()
class JobShare implements JobShareInterface {
  private _logger: Logger

  constructor(@inject(TYPES.LoggerProps) logger: Logger) {
    this._logger = logger
  }

  public async createJobShare(input: CreateJobShareInput, sdk: Sdk) {
    try {
      const result = await sdk.CreateJobShare({ input })

      const { jobShare } = result.createJobShare

      if (!jobShare) {
        throw new Error('Job share creation failed')
      }

      this._logger.info('Creating job share:', jobShare)
      return jobShare
    } catch (error) {
      this._logger.error('Failed to create job share:', error as Error)

      const errorMessage = parseGqlErrors(GraphQLErrorSchema.parse(error))

      throw new Error(errorMessage)
    }
  }
}

export { JobShare }
