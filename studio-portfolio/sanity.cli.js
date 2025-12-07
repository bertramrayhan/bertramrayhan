import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production'
  },
  deployment: {
    appId: 'vafve3cnsryuwdivown1183r',
    autoUpdates: true,
  }
})
