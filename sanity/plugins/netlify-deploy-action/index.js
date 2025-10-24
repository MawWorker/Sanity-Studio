// sanity/plugins/netlify-deploy-action/index.js
import { definePlugin } from 'sanity'

const BUILD_HOOK = process.env.SANITY_NETLIFY_BUILD_HOOK || ''

function wrapPublishAction(origAction) {
  if (!origAction || (origAction.key !== 'publish' && origAction.action !== 'publish')) {
    return origAction
  }

  return {
    ...origAction,
    async perform(context, doc) {
      // Run original publish
      const result = await origAction.perform?.(context, doc)

      // Fire Netlify build hook (non-blocking)
      if (BUILD_HOOK) {
        try {
          await fetch(BUILD_HOOK, { method: 'POST' })
          // console.log('[netlify-deploy-action] Netlify build hook fired')
        } catch (err) {
          console.error('[netlify-deploy-action] Failed to call build hook', err)
        }
      } else {
        console.warn('[netlify-deploy-action] SANITY_NETLIFY_BUILD_HOOK not set')
      }

      return result
    },
  }
}

export default definePlugin({
  name: 'netlify-deploy-action',
  document: {
    actions: (prev) => prev.map((a) => wrapPublishAction(a)),
  },
})
