import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../../renderer/App';
import NavigationComponent from '../../renderer/Navigation';
import DrawerComponent from '../../renderer/Drawer';
import TodoTxtDataGrid from '../../renderer/DataGrid';
import SplashScreen from '../../renderer/SplashScreen';
import FileTabs from '../../renderer/FileTabs';

global.window.electron = {
  ipcRenderer: {
    on: jest.fn(),
    once: jest.fn(),
    send: jest.fn(),
  },
};

jest.mock('../../main/util', () => ({
  activeFile: jest.fn(),
}));


describe('App', () => {
  it('renders without errors', () => {
    render(<App />);
  });

  it('renders NavigationComponent', () => {
    render(<App />);
    expect(screen.getByTestId('navigation-component')).toBeInTheDocument();
  });

	it('renders DrawerComponent when isDrawerOpen is true', () => {
		render(<App />);
		const filterButton = screen.getByTestId('navigation-button-filter');
		act(() => {
			filterButton.click();
		});
		expect(screen.getByTestId('drawer-component')).toBeInTheDocument();
	});

	it('renders TodoTxtDataGrid when todoTxtObjects is not empty', () => {
	    render(<App />);
	    const todoTxtObjects = {
	      A: [
	        {
	          id: 2,
	          body: 'test5 +testProject h:1 @testContext due:2023-06-05',
	          created: '2023-12-11T23:00:00.000Z',
	          complete: false,
	          priority: 'A',
	          contexts: ['testContext'],
	          projects: ['testProject'],
	          due: '2023-06-05',
	          t: null,
	          rec: null,
	        },
	        {
	          id: 1,
	          body: 'Another one with pm:322 promodoro timer',
	          created: '2023-06-23T22:00:00.000Z',
	          complete: false,
	          priority: 'A',
	          contexts: [],
	          projects: [],
	          due: null,
	          t: null,
	          rec: null,
	        },
	        {
	          id: 6,
	          body: 'Here is a #new one with a tag',
	          created: '2023-06-23T22:00:00.000Z',
	          complete: true,
	          priority: 'A',
	          contexts: [],
	          projects: [],
	          due: null,
	          t: null,
	          rec: null,
	        },
	      ]
	    };
	    render(<TodoTxtDataGrid todoTxtObjects={todoTxtObjects} />);
	    expect(screen.getByRole('grid')).toHaveClass('ReactVirtualized__Grid');
	  });

	it('does not render TodoTxtDataGrid when todoTxtObjects is empty', () => {
		render(<App />);
		const todoTxtObjects = {};
		render(<TodoTxtDataGrid todoTxtObjects={todoTxtObjects} />);
  		const dataGridComponent = screen.queryByTestId('data-grid-component');
  		expect(dataGridComponent).toBeNull();
	});

	it('renders SplashScreen when splashScreen is not null', () => {
		render(<App />);
		const splashScreen = 'noTodoTxtObjects';
		render(<SplashScreen screen={splashScreen} />)
		expect(screen.getByTestId('splashscreen-component')).toBeInTheDocument();
	});

	it('does not render SplashScreen when splashScreen is null', () => {
		render(<App />);
		const splashScreen = null;
		render(<SplashScreen screen={splashScreen} />)
		const splashScreenComponent = screen.queryByTestId('splashscreen-component');
  		expect(splashScreenComponent).toBeNull();
	});	

	it('renders FileTabs', () => {
		const files = [
		  {
		    active: true,
		    path: '/Users/ransome/Development/sleek/src/testData/sample.txt',
		    filename: 'sample.txt',
		  },
		  {
		    active: false,
		    path: '/Users/ransome/Development/sleek/src/testData/sample1.txt',
		    filename: 'sample1.txt',
		  },
		  {
		    active: false,
		    path: '/Users/ransome/Development/sleek/src/testData/empty.txt',
		    filename: 'empty.txt',
		  },
		  {
		    active: false,
		    path: '/Users/ransome/Development/sleek/src/testData/long.txt',
		    filename: 'long.txt',
		  },
		];

		render(<FileTabs files={files} />);
		expect(screen.getByTestId('file-tabs-component')).toBeInTheDocument();
	});
});