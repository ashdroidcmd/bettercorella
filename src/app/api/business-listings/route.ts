// "Register your business": posts each listing request to a private Discord channel for volunteers to review.
import {
  buildBusinessDiscordPayload,
  readBusinessListing,
  validateBusinessListing,
} from '@/features/town/shared/utils/businessListing'
import { handleDiscordForm } from '../_shared/discordForm'

export function POST(request: Request) {
  return handleDiscordForm(request, {
    // Its own channel when set; otherwise the tourism suggestions channel.
    webhook: process.env.DISCORD_BUSINESS_WEBHOOK_URL || process.env.DISCORD_SUGGESTIONS_WEBHOOK_URL,
    scope: 'business',
    read: readBusinessListing,
    validate: validateBusinessListing,
    payload: buildBusinessDiscordPayload,
  })
}
