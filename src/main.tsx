import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from './page/Home';
import { NotFound } from './page/NotFound';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <App />,
			errorElement: <NotFound />,
			children: [{ index: true, element: <Home /> }],
		},
	],
	{
		basename: import.meta.env.BASE_URL,
	},
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<HelmetProvider>
			<RecoilRoot>
				<App />
				<RouterProvider router={router} />
			</RecoilRoot>
		</HelmetProvider>
	</React.StrictMode>,
);
