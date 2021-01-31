const MINUTES_IN_HOUR = 60;

export const calculateSpeedInKmH = (
  distanceInKm: number, timeInMin: number,
): string => (distanceInKm / timeInMin).toFixed(2);
