import { archiveTodos } from '../../main/modules/File/Archive';
import fs from 'fs/promises';

jest.mock('electron', () => ({
  app: {
    setBadgeCount: jest.fn(),
  },
}));

jest.mock('../../main/main', () => ({
  mainWindow: {
    webContents: {
      send: jest.fn(),
    },
  },
}));

jest.mock('../../main/config', () => ({
  configStorage: {
    get: jest.fn(() => {
      return [
        { active: false, todoFilePath: './src/__tests__/__mock__/test1.txt', todoFileName: 'test1.txt', todoFileBookmark: null, doneFilePath: './src/__tests__/__mock__/done.txt', doneFileBookmark: null },
        { active: true, todoFilePath: './src/__tests__/__mock__/archiving.txt', todoFileName: 'archiving.txt', todoFileBookmark: null, doneFilePath: './src/__tests__/__mock__/done.txt', doneFileBookmark: null },
        { active: false, todoFilePath: './src/__tests__/__mock__/test3.txt', todoFileName: 'test3.txt', todoFileBookmark: null, doneFilePath: './src/__tests__/__mock__/done.txt', doneFileBookmark: null },
      ];
    }),
    set: jest.fn(),
  },
}));

jest.mock('../../main/modules/Menu', () => ({
  createMenu: jest.fn(),
}));

describe('Archiving', () => {
	beforeEach(async() => {
		jest.clearAllMocks();
		await fs.writeFile('./src/__tests__/__mock__/archiving.txt', `Unfinished todo 1\nx 2022-02-01 Finished todo 3\nUnfinished todo 2\nx 2022-02-08 Finished todo 1\nUnfinished todo 3\nx 2022-02-17 Finished todo 2`, 'utf8');
		await fs.writeFile('./src/__tests__/__mock__/done.txt', `x 2022-02-02 todo from done.txt 1\nx 2022-02-03 todo from done.txt 2\nx 2022-02-04 todo from done.txt 3\nx 2022-02-05 todo from done.txt 4`, 'utf8');		
	});

	afterAll(async () => {
		await fs.unlink('./src/__tests__/__mock__/archiving.txt');
		await fs.unlink('./src/__tests__/__mock__/done.txt');
	});

	test('Should collect data from todo and done file and merge it properly', async () => {
		await archiveTodos();
		const fileContent = await fs.readFile('./src/__tests__/__mock__/done.txt', 'utf8');
		const expectedContent = `x 2022-02-02 todo from done.txt 1\nx 2022-02-03 todo from done.txt 2\nx 2022-02-04 todo from done.txt 3\nx 2022-02-05 todo from done.txt 4\nx 2022-02-01 Finished todo 3\nx 2022-02-08 Finished todo 1\nx 2022-02-17 Finished todo 2`;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		expect(fileContent).toEqual(expectedContent);
	});
});