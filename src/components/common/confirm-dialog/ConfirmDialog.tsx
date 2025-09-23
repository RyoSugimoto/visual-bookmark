import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn/alert-dialog';

export interface ConfirmDialogProps {
  open: boolean;
  cancel: (open: boolean) => void;
  action: () => void;
  title: string;
  description?: string;
  cancelLabel: string;
  actionLabel: string;
}

export default function ConfirmDialog({
  open,
  cancel,
  action,
  title,
  description,
  cancelLabel,
  actionLabel,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={cancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => cancel(false)}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={action}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
