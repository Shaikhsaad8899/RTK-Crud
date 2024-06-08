import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import createBrowserRouter and RouterProvider
import store from './Redux/store';
import { routes } from './components/routes'; // Import routes from routes.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/css/style.css';

const App = () => {
  const router = createBrowserRouter(routes); // Pass routes to createBrowserRouter
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <div>
          {/* Your component rendering goes here */}
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
      </RouterProvider>
    </Provider>
  );
};

export default App;
