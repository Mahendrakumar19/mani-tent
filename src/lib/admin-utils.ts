import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'public', 'data');

export function readJSONFile(filename: string) {
  try {
    const filePath = join(DATA_DIR, filename);
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

export function writeJSONFile(filename: string, data: any) {
  try {
    const filePath = join(DATA_DIR, filename);
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function verifyAdminPassword(password: string): boolean {
  try {
    const config = readJSONFile('admin-config.json');
    return config && config.password === password;
  } catch {
    return false;
  }
}
