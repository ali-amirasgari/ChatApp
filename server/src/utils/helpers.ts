/**
 * Generate a unique ID 
 * @returns A unique string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Format a date to a readable string
 * @param date The date to format
 * @returns A formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleString();
}; 