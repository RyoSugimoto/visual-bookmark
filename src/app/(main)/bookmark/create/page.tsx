import { createUuidV4 } from '@/utils';
import BookmarkCreationForm from './BookmarkCreationForm';

export default function Page() {
  return (
    <div>
      <BookmarkCreationForm formId={createUuidV4()} />
    </div>
  );
}
