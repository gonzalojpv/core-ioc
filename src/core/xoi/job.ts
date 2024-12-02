import { injectable } from 'inversify'
import { JobInterface } from './interfaces'
import { WorkOrderReadyEvent } from './types'
import { parseGqlErrors } from '../helper'
import { GraphQLErrorSchema } from './schemas'
import { CreateJobInput, Sdk, CompleteJobInput } from '../../generated/graphql'

@injectable()
class Job implements JobInterface {
  public async cerateJob(workOrderReadyEvent: WorkOrderReadyEvent, sdk: Sdk) {
    const input: CreateJobInput = {
      newJob: { ...workOrderReadyEvent },
    }

    try {
      return (await sdk.CreateJob({ input })).createJob.job
    } catch (error) {
      const errorMessage = parseGqlErrors(GraphQLErrorSchema.parse(error))

      throw new Error(errorMessage)
    }
  }

  public async getJobs(sdk: Sdk) {
    const result = await sdk.ListJobs({
      input: { limit: 5, nextToken: '' },
    })

    return result.listJobs.jobConnection.items
  }

  public async addWorkflow(
    sdk: Sdk,
    jobId: string,
    workflowTemplateExternalId: string,
    externalId: string
  ) {
    const result = await sdk.AddWorkflow({
      input: {
        jobId,
        workflowTemplateExternalId,
        externalId,
      },
    })
    return result.addWorkflow.workflow
  }

  public async getJobSummary(sdk: Sdk, jobId: string, workflowJobId?: string, nextToken?: string) {
    const result = await sdk.GetJobSummary({
      input: {
        jobId,
        workflowJobId,
        nextToken,
      },
    })

    return {
      jobSummary: result.getJobSummary.jobSummary,
      nextToken: result.getJobSummary.nextToken,
    }
  }

  public async getJobIdByExternalId(sdk: Sdk, externalId: string): Promise<string | null> {
    try {
      const result = await sdk.GetJobIdByExternalId({
        input: { externalId },
      })

      return result.getJobIdByExternalId.jobId
    } catch (_error) {
      return null
    }
  }

  public async completedJob(sdk: Sdk, jobId: string) {
    const input: CompleteJobInput = { id: jobId }

    const result = await sdk.CompleteJob({ input })

    return result.completeJob
  }

  public async getJobById(sdk: Sdk, jobId: string) {
    try {
      const result = await sdk.GetJob({
        input: { id: jobId },
      })

      return result?.getJob?.job
    } catch (error) {
      const errorMessage = parseGqlErrors(GraphQLErrorSchema.parse(error))

      throw new Error(`Job with id ${jobId} not found: ${errorMessage}`)
    }
  }
}

export { Job }
