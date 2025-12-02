import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'r4mlzps1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-07-01',
})