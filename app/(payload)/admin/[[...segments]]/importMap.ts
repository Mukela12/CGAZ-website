/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* Manually extended with custom admin components — `payload generate:importmap`
 * currently can't load payload.config.ts under Node 22 ESM, so entries for
 * project-local components are maintained by hand here.
 */
import '@payloadcms/next/css'

// Import required Payload UI components
import { CollectionCards } from '@payloadcms/ui/rsc'

// Custom admin components (project-local)
import AudioUploadField from '../../../../payload/components/AudioUploadField'
import Step1Instructions from '../../../../payload/components/Step1Instructions'
import Step2Instructions from '../../../../payload/components/Step2Instructions'
import Step3Instructions from '../../../../payload/components/Step3Instructions'
import TipsContent from '../../../../payload/components/TipsContent'

// Import Lexical rich text components
import { RscEntryLexicalCell, RscEntryLexicalField, LexicalDiffComponent } from '@payloadcms/richtext-lexical/rsc'
import {
  InlineToolbarFeatureClient,
  HorizontalRuleFeatureClient,
  UploadFeatureClient,
  BlockquoteFeatureClient,
  RelationshipFeatureClient,
  LinkFeatureClient,
  ChecklistFeatureClient,
  OrderedListFeatureClient,
  UnorderedListFeatureClient,
  IndentFeatureClient,
  AlignFeatureClient,
  HeadingFeatureClient,
  ParagraphFeatureClient,
  InlineCodeFeatureClient,
  SuperscriptFeatureClient,
  SubscriptFeatureClient,
  StrikethroughFeatureClient,
  UnderlineFeatureClient,
  BoldFeatureClient,
  ItalicFeatureClient,
} from '@payloadcms/richtext-lexical/client'

export const importMap = {
  '@payloadcms/ui/rsc#CollectionCards': CollectionCards,
  '@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell': RscEntryLexicalCell,
  '@payloadcms/richtext-lexical/rsc#RscEntryLexicalField': RscEntryLexicalField,
  '@payloadcms/richtext-lexical/rsc#LexicalDiffComponent': LexicalDiffComponent,
  '@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient': InlineToolbarFeatureClient,
  '@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient': HorizontalRuleFeatureClient,
  '@payloadcms/richtext-lexical/client#UploadFeatureClient': UploadFeatureClient,
  '@payloadcms/richtext-lexical/client#BlockquoteFeatureClient': BlockquoteFeatureClient,
  '@payloadcms/richtext-lexical/client#RelationshipFeatureClient': RelationshipFeatureClient,
  '@payloadcms/richtext-lexical/client#LinkFeatureClient': LinkFeatureClient,
  '@payloadcms/richtext-lexical/client#ChecklistFeatureClient': ChecklistFeatureClient,
  '@payloadcms/richtext-lexical/client#OrderedListFeatureClient': OrderedListFeatureClient,
  '@payloadcms/richtext-lexical/client#UnorderedListFeatureClient': UnorderedListFeatureClient,
  '@payloadcms/richtext-lexical/client#IndentFeatureClient': IndentFeatureClient,
  '@payloadcms/richtext-lexical/client#AlignFeatureClient': AlignFeatureClient,
  '@payloadcms/richtext-lexical/client#HeadingFeatureClient': HeadingFeatureClient,
  '@payloadcms/richtext-lexical/client#ParagraphFeatureClient': ParagraphFeatureClient,
  '@payloadcms/richtext-lexical/client#InlineCodeFeatureClient': InlineCodeFeatureClient,
  '@payloadcms/richtext-lexical/client#SuperscriptFeatureClient': SuperscriptFeatureClient,
  '@payloadcms/richtext-lexical/client#SubscriptFeatureClient': SubscriptFeatureClient,
  '@payloadcms/richtext-lexical/client#StrikethroughFeatureClient': StrikethroughFeatureClient,
  '@payloadcms/richtext-lexical/client#UnderlineFeatureClient': UnderlineFeatureClient,
  '@payloadcms/richtext-lexical/client#BoldFeatureClient': BoldFeatureClient,
  '@payloadcms/richtext-lexical/client#ItalicFeatureClient': ItalicFeatureClient,
  // Custom project components
  '/payload/components/AudioUploadField#default': AudioUploadField,
  '/payload/components/Step1Instructions#default': Step1Instructions,
  '/payload/components/Step2Instructions#default': Step2Instructions,
  '/payload/components/Step3Instructions#default': Step3Instructions,
  '/payload/components/TipsContent#default': TipsContent,
}
