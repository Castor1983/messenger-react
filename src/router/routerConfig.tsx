import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {appRoutes} from "./appRoutes";
import {MainLayout} from "../layouts/MainLayout";
import {HomePage} from "../pages/HomePage";
import {AuthPage} from "../pages/AuthPage";
import {ChatPage} from "../pages/ChatPage";

const routes: RouteObject[] = [{
    path: appRoutes.MAIN, element: <MainLayout/>, children: [

        {index: true, element: <Navigate to={appRoutes.AUTH}/>},

        {
            path: appRoutes.AUTH,
            element: <AuthPage/>
        },
                {
                    path: appRoutes.CHAT,
                    element: <ChatPage/>
                }

    ]

}]

const routerConfig = createBrowserRouter(routes);

export default routerConfig;
