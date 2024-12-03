// file entities.ts

import { injectable, inject } from 'inversify'
import { XOiClientInterface } from './interfaces'
import { TYPES, WorkOrderReadyEventJob } from './types'
import { Job } from './job'
import { JobShare } from './share'
import Logger from '../utils/logger'
import { z } from 'zod'
import { ConfigVarsType } from './types'
import { mask, createSdk } from '../utils/helper'

const AuthResponseSchema = z.object({
  token: z.string().optional(),
  message: z.string().optional(),
})

@injectable()
class XOiClient implements XOiClientInterface {
  private _job: Job
  private _jobShare: JobShare
  private _logger: Logger

  constructor(
    @inject(TYPES.JobProps) job: Job,
    @inject(TYPES.JobShareProps) jobShare: JobShare,
    @inject(TYPES.LoggerProps) logger: Logger
  ) {
    this._job = job
    this._jobShare = jobShare
    this._logger = logger
  }

  private async authXOi(configVars: ConfigVarsType): Promise<string> {
    const errorMessages = 'XOi authentication failed due to an error'
    const { apiKey, apiSecret, apiUrl: apiBaseUrl } = configVars['XOi Connection'].fields

    const environmentReplacements: Record<string, string> = {
      '.dev.xoeye.com': '.dev.xoeye.com/devl/token',
      '.stag.xoeye.com': '.xoeye.com/stag/token',
      '.xoi.io': '.xoi.io/prod/token',
    }

    const apiUrl = Object.entries(environmentReplacements).reduce((url, [key, replacement]) => {
      return url.includes(key) ? url.replace(key, replacement) : url
    }, apiBaseUrl)

    this._logger.info('Authenticating with XOi: ', {
      apiUrl,
      apiKey: apiKey,
      apiSecret: mask(apiSecret),
    })

    try {
      const body = JSON.stringify({
        api_key: apiKey,
        api_secret: apiSecret,
      })
      const response = await fetch(apiUrl, {
        method: 'post',
        body,
      })

      const data = AuthResponseSchema.parse(await response.json())
      const { token, ...restData } = data || {}

      this._logger.info('XOi Auth response: ', {
        token: mask(token || ''),
        restOfData: restData,
      })

      if (!data.token) {
        throw new Error('XOi Auth failed')
      }

      return data.token
    } catch (error) {
      throw error
    }
  }

  public async jobCreationFlow(jobDetails: WorkOrderReadyEventJob, configVars: ConfigVarsType) {
    try {
      const xoiAccessToken = await this.authXOi(configVars)
      //TODO: inject the SDKs
      const jobSdk = createSdk(configVars.gqlJobsExternal, xoiAccessToken)
      const shareSdk = createSdk(configVars.gqlShareExternal, xoiAccessToken)

      this._logger.debug('Step: Creating job:', jobDetails)

      const job = await this._job.createJob(jobDetails, jobSdk)
      const jobIds = [job.id]

      this._logger.info('Step: Created job:', job)

      this._logger.debug('Step: Creating Customer Job Share...')
      const customerShare = await this._jobShare.createJobShare(
        { jobIds, shareEntireJob: false },
        shareSdk
      )

      this._logger.info('Step: Created Customer Job Share:', customerShare)

      this._logger.debug('Step: Creating Entire Job Share...')
      const entireShare = await this._jobShare.createJobShare(
        { jobIds, shareEntireJob: true },
        shareSdk
      )
      this._logger.info('Step: Created Entire Job Share:', entireShare)
      return { job, customerShare, entireShare }
    } catch (error) {
      console.log('---', this._logger)
      this._logger.error('Job creation flow failed:', error as Error)

      throw error
    }
  }
}

export { Job, JobShare, XOiClient }
