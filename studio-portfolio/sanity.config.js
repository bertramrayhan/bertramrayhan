import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'

import project from './schemaTypes/project'
import timelineEvent from './schemaTypes/experience.js'
import pageContent from './schemaTypes/pageContent.js'

const supportedLanguages = [
    {id: 'id', title: 'Indonesia'},
    {id: 'en', title: 'English'}
]

export default defineConfig({
  name: 'default',
  title: 'Bertram Portfolio Studio',

  projectId: 'r4mlzps1',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    // 2. Konfigurasi plugin
    documentInternationalization({
      supportedLanguages: supportedLanguages,
      schemaTypes: ['project', 'timelineEvent', 'pageContent'],
    })
  ],

  schema: {
    types: [project, timelineEvent, pageContent],
  },
})