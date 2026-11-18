// "Add a tourist spot or event": posts each suggestion to a private Discord channel for volunteers to review.
import { buildDiscordPayload, readSuggestion, validateSuggestion } from '@/features/town/shared/utils/suggestion'
import { handleDiscordForm } from '../_shared/discordForm'

export function POST(request: Request) {
  return handleDiscordForm(request, {
    webhook: process.env.DISCORD_SUGGESTIONS_WEBHOOK_URL,
    scope: 'suggestions',
    read: readSuggestion,
    validate: validateSuggestion,
    payload: buildDiscordPayload,
  })
}
