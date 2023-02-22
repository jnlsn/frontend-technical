export const formatTime = (hour: number): string => {
  const today = new Date();
  return new Date(today.setHours(hour, 0, 0)).toLocaleTimeString(undefined, {
    timeStyle: "short",
  });
};
