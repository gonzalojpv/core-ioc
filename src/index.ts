import dotenv from 'dotenv'
import { XOiClientInstance } from './core/xoi'
import { ConfigVarsType } from './core/xoi/types'
import { generateID } from './core/utils/helper'

dotenv.config()

const authApiKey = process.env.XOI_API_KEY
const authApiSecret = process.env.XOI_API_SECRET

const configVars: ConfigVarsType = {
  gqlJobsExternal: 'https://gql-jobs-external.dev.xoeye.com/graphql',
  gqlUsersExternal: 'https://gql-users-external.dev.xoeye.com/graphql',
  gqlContentExternal: 'https://gql-content-external.dev.xoeye.com/graphql',
  gqlShareExternal: 'https://gql-share-external.dev.xoeye.com/graphql',
  pjsaWorkflowTemplateExternalId: 'WF-12345',
  'XOi Connection': {
    configVarKey: 'XOi Connection',
    key: 'xOiConnection',
    fields: {
      apiKey: authApiKey as string,
      apiUrl: 'https://api-users-external.dev.xoeye.com',
      apiSecret: authApiSecret as string,
    },
  },
  'NetSuite Connection': {
    configVarKey: 'NetSuite Connection',
    key: 'netSuiteConnection',
    fields: {
      netSuiteBaseUrl: 'https://netsuite.example.com',
      realm: 'NETSUITE-REALM-1234',
      consumerKey: 'NS-CONSUMER-KEY-1234',
      consumerSecret: 'NS-CONSUMER-SECRET-1234',
      tokenID: 'NS-TOKEN-ID-1234',
      tokenSecret: 'NS-TOKEN-SECRET-1234',
    },
  },
}

const inputs = {
  assigneeIds: ['gonzalo.vargas@saasfactory.vc'],
  jobLocation: '5299 DTC Blvd STE STE 720 Englewood CO 80111 United States',
  customerName: 'FSM Test Customer',
  workOrderNumber: 'UNKOWN',
  externalAppUrl: 'https://example.com',
  externalId: generateID(), // this input must be unique in the system or the mutation will fail
}

const initProcess = async () => {
  console.log('Starting...')
  await XOiClientInstance.jobCreationFlow(inputs, configVars)
  console.log('Done..')
}

initProcess()
