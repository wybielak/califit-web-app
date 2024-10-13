import { observer } from "mobx-react-lite"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import Profile from "./Profile"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
])

export default observer(function UserContent() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
})
