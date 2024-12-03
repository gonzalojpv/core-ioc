import { z } from 'zod'

export const JobInputSchema = z.object({
  externalId: z.string(),
  assigneeIds: z.array(z.string().email('Invalid email format')),
  jobLocation: z.string({
    required_error: 'Job Location is required',
    invalid_type_error: 'Job Location must be a string',
  }),
  customerName: z.string({
    required_error: 'Customer Name is required',
    invalid_type_error: 'Customer Name must be a string',
  }),
  workOrderNumber: z.string().default('UNKOWN'), // Handles default for unknown workOrderNumber
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
          newJob: JobInputSchema.optional(),
        }),
      }),
    }),
  })
  .passthrough()

const connectionFieldsSchema = z.object({
  apiKey: z.string({
    required_error: 'apiKey is required',
    invalid_type_error: 'apiKey must be a string',
  }),
  apiUrl: z.string().url('API URL must be a valid URL'),
  apiSecret: z.string(),
})

const connectionSchema = z.object({
  configVarKey: z.string({
    required_error: 'configVarKey is required',
    invalid_type_error: 'configVarKey must be a string',
  }),
  key: z.string({
    required_error: 'key is required',
    invalid_type_error: 'key must be a string',
  }),
  fields: connectionFieldsSchema,
})

export const ConfigVarSchema = z
  .object({
    gqlJobsExternal: z.string({
      required_error: 'gqlJobsExternal is required',
      invalid_type_error: 'gqlJobsExternal must be a string',
    }),
    gqlUsersExternal: z.string({
      required_error: 'gqlUsersExternal is required',
      invalid_type_error: 'gqlUsersExternal must be a string',
    }),
    gqlContentExternal: z.string({
      required_error: 'gqlContentExternal is required',
      invalid_type_error: 'gqlContentExternal must be a string',
    }),
    gqlShareExternal: z.string({
      required_error: 'gqlShareExternal is required',
      invalid_type_error: 'gqlShareExternal must be a string',
    }),
    pjsaWorkflowTemplateExternalId: z.string({
      required_error: 'pjsaWorkflowTemplateExternalId is required',
      invalid_type_error: 'pjsaWorkflowTemplateExternalId must be a string',
    }),
    'XOi Connection': connectionSchema,
  })
  .passthrough()
