import { type SchemaTypeDefinition } from 'sanity'
import { aurthor } from './aurthor'
import { startup } from './startup'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aurthor, startup, playlist],
}