type NotificationProps = {
  message: string;
  shouldDisplay?: boolean;
};

export const Notification = ({
  message,
  shouldDisplay = true,
}: NotificationProps) => {
  if (!shouldDisplay) return null;
  return (
    <div className="w-full border border-blue-800 bg-blue-400 p-2 text-blue-900">
      {message}
    </div>
  );
};

export const SuccessNotification = ({
  message,
  shouldDisplay = true,
}: NotificationProps) => {
  if (!shouldDisplay) return null;
  return (
    <div className="w-full border border-green-800 bg-green-400 p-2 text-green-900">
      {message}
    </div>
  );
};

export const ErrorNotification = ({
  message,
  shouldDisplay = true,
}: NotificationProps) => {
  if (!shouldDisplay) return null;
  return (
    <div className="w-full border border-red-800 bg-red-400 p-2 text-red-900">
      {message}
    </div>
  );
};
