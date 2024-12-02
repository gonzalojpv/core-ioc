import { z } from 'zod'

export const WorkOrderReadyEventSchema = z.object({
  externalId: z.string(),
  assigneeIds: z.array(z.string()),
  jobLocation: z.string(),
  customerName: z.string(),
  workOrderNumber: z.string().default('UNKOWN'), // Handles default for unknown workOrderNumber
})

const jobInputSchema = z.object({
  externalId: z.string(),
  assigneeIds: z.array(z.string()),
  jobLocation: z.string(),
  customerName: z.string(),
  workOrderNumber: z.string(),
})

export const GraphQLErrorSchema = z
  .object({
    response: z.object({
      data: z.null(),
      errors: z.array(
        z.object({
          path: z.array(z.string()),
          data: z.null(),
          errorType: z.string(),
          errorInfo: z.object({
            aws_request_id: z.string(),
            log_stream_name: z.string(),
            datetime: z.string(), // ISO 8601 format
            stage: z.string(),
          }),
          locations: z.array(
            z.object({
              line: z.number(),
              column: z.number(),
              sourceName: z.null(),
            })
          ),
          message: z.string(),
        })
      ),
      status: z.number(),
      headers: z.object({}).passthrough(), // Flexible for additional header fields
    }),
    request: z.object({
      query: z.string(),
      variables: z.object({
        input: z.object({
          id: z.string().optional(),
          newJob: jobInputSchema.optional(),
        }),
      }),
    }),
  })
  .passthrough()