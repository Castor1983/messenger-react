import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {appRoutes} from "./appRoutes";
import {MainLayout} from "../layouts/MainLayout";
import {HomePage} from "../pages/HomePage";
import {RegisterPage} from "../pages/RegisterPage";
import {LoginPage} from "../pages/LoginPage";
import {ChatPage} from "../pages/ChatPage";

const routes: RouteObject[] = [{
    path: appRoutes.MAIN, element: <MainLayout/>, children: [

        {index: true, element: <Navigate to={appRoutes.MAIN}/>},
        {
            path: appRoutes.HOME,
            element: <HomePage/>
        },
        {
            path: appRoutes.REGISTER,
            element: <RegisterPage/>
        },
        {
            path: appRoutes.LOGIN,
            element: <LoginPage/>, children: [
                {
                    path: appRoutes.CHAT,
                    element: <ChatPage/>
                }
            ]
        }
    ]

}]

const routerConfig = createBrowserRouter(routes);

export default routerConfig;
