import z from 'zod';
import {
  type ErrorCode,
  FIELD_NAMES,
} from '@/actions/bookmark/bookmark-deletion-action';
import type { StateIO } from '@/app/action-handlers/shared/HandleActionState';

const inputSchema = z.object({
  [FIELD_NAMES.id]: z.string().optional(),
});

const resultSchema = z.object({
  bookmarkId: z.string(),
});

export type State = StateIO<
  z.infer<typeof inputSchema>,
  z.infer<typeof resultSchema>,
  ErrorCode
>;
