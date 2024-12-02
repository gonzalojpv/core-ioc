// file entities.ts

import { injectable, inject } from 'inversify'
import { XOiClientInterface } from './interfaces'
import { TYPES } from './types'
import { Job } from './job'
import { JobShare } from './share'

@injectable()
class XOiClient implements XOiClientInterface {
  private _job: Job
  private _jobShare: JobShare

  constructor(@inject(TYPES.JobProps) job: Job, @inject(TYPES.JobShareProps) jobShare: JobShare) {
    this._job = job
    this._jobShare = jobShare
  }

  public execute(): string {
    console.log('Step 1: create Job')
    this._job.cerateJob()
    console.log('Step 2: create JobShare')
    this._jobShare.createJobShare()
    return 'Ok'
  }
}

export { Job, JobShare, XOiClient }
