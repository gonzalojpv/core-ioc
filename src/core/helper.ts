import { z } from 'zod'
import { GraphQLErrorSchema } from './xoi/schemas'

type GraphQLError = z.infer<typeof GraphQLErrorSchema>
/**
 * delay function to pause the process for a given number of milliseconds
 * @param milliseconds
 * @returns Promise<void>
 **/
export const delay = (milliseconds: number): Promise<void> => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}

export const cleanString = (input: string): string => {
  // Remove \r and \n
  let cleaned = input.replace(/\r|\n/g, '')

  // Remove <br/> and other HTML tags
  cleaned = cleaned.replace(/<br\s*\/?>|<\/?\w+.*?>/gi, '')

  return cleaned.trim()
}

export const parseGqlErrors = (error: GraphQLError): string => {
  let message = ''
  // If the error matches the GraphQL error structure, process the errors
  error.response?.errors?.forEach((graphQLError, index: number) => {
    message += `\nError #${index + 1}:`
    message += ` Message: ${graphQLError.message},`
    message += ` Path: ${graphQLError.path?.join(' -> ') || 'N/A'},`
    message += ` Error Type: ${graphQLError.errorType || 'N/A'},`
    message += ` Error Info: ${JSON.stringify(graphQLError.errorInfo) || 'N/A'},`
    message += ` Locations: ${JSON.stringify(graphQLError.locations) || 'N/A'}.`
  })

  return message
}
