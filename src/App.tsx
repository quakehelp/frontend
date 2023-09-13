import { MantineProvider } from '@mantine/core';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }
  ])

  return <MantineProvider withGlobalStyles withNormalizeCSS>
    <ModalsProvider modalProps={{
      centered: true,
      overlayProps: {
        blur: 4
      }
    }}>

      <Notifications position='bottom-right' autoClose={3000} color='secondary' />

      <RouterProvider router={routes} />

    </ModalsProvider>
  </MantineProvider>

}

export default App
