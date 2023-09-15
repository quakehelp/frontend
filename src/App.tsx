import { createEmotionCache, MantineProvider } from '@mantine/core';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import useUser from './states/user.state';
import BottomNav from './partials/bottomNav';
import BottomNavAdmin from './partials/bottomNavAdmin';
import { useTranslation } from 'react-i18next';
import rtlPlugin from 'stylis-plugin-rtl';

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  stylisPlugins: [rtlPlugin],
});
function App() {
  const user = useUser((state) => state.user)
  const routes = (admin: boolean) => createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: admin ? <Navigate to="admin" /> : <BottomNav />,
        },
        {
          path: "admin",
          element: admin ? <BottomNavAdmin /> : <Navigate to="/" />,
        },

      ]
    }
  ])
  const { i18n } = useTranslation()

  return <MantineProvider withGlobalStyles withNormalizeCSS
  emotionCache={i18n.language === "ar" ? rtlCache : undefined}
  theme={{ dir: i18n.language === "ar" ? "rtl" : "ltr" }}>
    <ModalsProvider modalProps={{
      centered: true,
      overlayProps: {
        blur: 4
      }
    }}>

      <Notifications position='bottom-right' autoClose={3000} color='secondary' />

      <RouterProvider router={routes(user != undefined)} />

    </ModalsProvider>
  </MantineProvider>

}

export default App
