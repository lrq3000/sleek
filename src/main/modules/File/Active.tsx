import { configStorage } from '../../config';

export function getActiveFile(): FileObject | null {
  const files: FileObject[] = configStorage.get('files');
  if(files.length === 0) return null;
  const activeIndex = files.findIndex((file) => file.active);
  return files[activeIndex];
}
