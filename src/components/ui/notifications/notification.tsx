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
      className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black/5"
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className="text-brand-600 size-5 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
        </div>
        <button
          type="button"
          aria-label="Dismiss notification"
          className="text-gray-400 hover:text-gray-600"
          onClick={() => onDismiss(id)}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
