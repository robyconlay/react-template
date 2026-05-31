import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-react';

import { type Notification as NotificationType } from './notifications-store';

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
} as const;

export type NotificationProps = {
  notification: NotificationType;
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  const Icon = icons[type];

  return (
    <div
      role="alert"
      aria-label={title}
      className="bg-card text-card-foreground pointer-events-auto w-full max-w-sm rounded-lg shadow-lg ring-1 ring-black/5"
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className="text-primary size-5 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-foreground text-sm font-medium">{title}</p>
          {message && (
            <p className="text-muted-foreground mt-1 text-sm">{message}</p>
          )}
        </div>
        <button
          type="button"
          aria-label="Dismiss notification"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => onDismiss(id)}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
