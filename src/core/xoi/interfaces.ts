import { Job, Sdk, Workflow, CompleteJobResult, JobSummary } from '../../generated/graphql'
import { WorkOrderReadyEvent } from './types'

interface GetJobSummaryProps {
  jobSummary: JobSummary
  nextToken: string | null
}

export interface JobInterface {
  cerateJob(workOrderReadyEvent: WorkOrderReadyEvent, sdk: Sdk): Promise<Job>
  getJobs(sdk: Sdk): Promise<Job[]>
  completedJob(sdk: Sdk, jobId: string): Promise<CompleteJobResult>
  getJobById(sdk: Sdk, jobId: string): Promise<Job | null>
  getJobIdByExternalId(sdk: Sdk, externalId: string): Promise<string | null>
  addWorkflow(
    sdk: Sdk,
    jobId: string,
    workflowTemplateExternalId: string,
    externalId: string
  ): Promise<Workflow>
  getJobSummary(sdk: Sdk, jobId: string, workflowJobId?: string, nextToken?: string): void
}

export interface JobShareInterface {
  createJobShare(): string
}

export interface XOiClientInterface {
  execute(): string
}
