import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { schemaTypes } from './schemaTypes'

// Explicit JS import (helps Vite resolve the plugin reliably)
import netlifyDeployAction from './sanity/plugins/netlify-deploy-action/index.js'

/**
 * Wrap plugin install so Studio still starts if plugin is undefined.
 * (Import *must* succeed for this file to run — if the import fails
 * you'll get an earlier error. This guard prevents runtime crashes
 * from plugin not returning a function.)
 */
const maybeNetlifyPlugin = (typeof netlifyDeployAction === 'function')
  ? (() => {
      try {
        // log once when plugin is constructed (check Studio terminal)
        // eslint-disable-next-line no-console
        console.log('[sanity.config] registering netlify-deploy-action plugin')
      } catch (e) { /* ignore */ }
      return netlifyDeployAction()
    })
  : undefined

export default defineConfig({
  name: 'default',
  title: 'DailyCrypto',

  projectId: 'uiu9mgqs',
  dataset: 'production',

  // Deployment configuration for Sanity hosting
  deployment: {
    autoUpdates: true,
    appId: 'yctcltbhm5eoqkdavtd47x77'
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // News & Articles
            S.listItem()
              .title('News Posts')
              .child(
                S.documentTypeList('newsPost')
                  .title('News Posts')
                  .filter('_type == "newsPost"')
                  .defaultOrdering([{ field: 'datePublished', direction: 'desc' }])
              ),

            // Daily Content
            S.listItem()
              .title('Daily Recaps')
              .child(
                S.documentTypeList('dailyRecap')
                  .title('Daily Recaps')
                  .filter('_type == "dailyRecap"')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),

            // Weekly Content
            S.listItem()
              .title('Weekly Summaries')
              .child(
                S.documentTypeList('weeklySummary')
                  .title('Weekly Summaries')
                  .filter('_type == "weeklySummary"')
                  .defaultOrdering([{ field: 'weekStartDate', direction: 'desc' }])
              ),

            // Archives
            S.listItem()
              .title('Archives')
              .child(
                S.documentTypeList('archive')
                  .title('Archives')
                  .filter('_type == "archive"')
                  .defaultOrdering([{ field: 'date', direction: 'desc' }])
              ),

            S.divider(),

            // Reference Data
            S.listItem()
              .title('Authors')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
                  .filter('_type == "author"')
              ),

            S.listItem()
              .title('Categories')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .filter('_type == "category"')
              ),
          ])
    }),
    visionTool(),
    cloudinarySchemaPlugin(),

    // Insert the Netlify plugin only if it exists; filter(Boolean) removes undefined entries
    ...(maybeNetlifyPlugin ? [maybeNetlifyPlugin] : []),
  ].filter(Boolean),

  schema: {
    types: schemaTypes,
  },
})