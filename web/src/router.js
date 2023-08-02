import React, { lazy } from 'react';
import Loadable from "./views/ui-component/Loadable";

const MainLayout = Loadable(lazy(() => import('./views/main/MainLayout')));
const SocketComponent = Loadable(lazy(() => import('./views/chat/SocketComponent')));

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                exact: true,
                element: <SocketComponent />
            }
        ]
    }
]

export default routes