import {
  Job,
  Sdk,
  Workflow,
  CompleteJobResult,
  CreateJobShareInput,
  JobShare,
} from '../../generated/graphql'
import { WorkOrderReadyEventJob, ConfigVarsType } from './types'
import Logger, { type LogLevel } from '../utils/logger'

export interface JobInterface {
  createJob(workOrderReadyEvent: WorkOrderReadyEventJob, sdk: Sdk): Promise<Job>
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
  createJobShare(input: CreateJobShareInput, sdk: Sdk, logger: Logger): Promise<JobShare>
}

export interface XOiClientInterface {
  jobCreationFlow(
    jobDetails: WorkOrderReadyEventJob,
    configVars: ConfigVarsType
  ): Promise<{
    job: Job
    customerShare: JobShare
    entireShare: JobShare
  }>
}

export interface LoggerInterface {
  setConsole(customConsole: Console): void
  info(message: string, details?: Record<string, unknown>): void
  warn(message: string, details?: Record<string, unknown>): void
  error(message: string, details?: Record<string, unknown> | Error): void
  debug(message: string, details?: Record<string, unknown>): void
  logMessage(message: string, details?: Record<string, unknown>): void
}
