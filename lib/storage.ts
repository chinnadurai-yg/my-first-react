import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Utility to manage local JSON storage
 */
export const storage = {
  /**
   * Reads data from a JSON file in the data directory
   */
  read: <T>(filename: string, defaultValue: T): T => {
    try {
      const filePath = path.join(DATA_DIR, filename);
      if (!fs.existsSync(filePath)) return defaultValue;
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as T;
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return defaultValue;
    }
  },

  /**
   * Writes data to a JSON file in the data directory
   */
  write: <T>(filename: string, data: T): void => {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const filePath = path.join(DATA_DIR, filename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
    }
  }
};
