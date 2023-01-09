import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import { RouteType } from "./config";
import MapPage from "../pages/dashboard/MapPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";


const appRoutes: RouteType[] = [
    {
        index: true,
        element: <MapPage />,
        state: "dashboard.map"
    },
    {
        path: "/dashboard",
        element: <DashboardPageLayout />,
        state: "dashboard",
        sidebarProps: {
            displayText: "Dashboard",
            icon: <DashboardOutlinedIcon />
        },
        child: [
            {
                index: true,
                element: <DashboardIndex />,
                state: "dashboard.index"
            },
            {
                path: "/dashboard/map",
                element: <MapPage />,
                state: "dashboard.map",
                sidebarProps: {
                    displayText: "Map"
                },
            },
            {
                path: "/dashboard/analytics",
                element: <AnalyticsPage />,
                state: "dashboard.analytics",
                sidebarProps: {
                    displayText: "Analytic"
                }
            },
            {
                path: "/dashboard/saas",
                element: <SaasPage />,
                state: "dashboard.saas",
                sidebarProps: {
                    displayText: "Saas"
                }
            }
        ]
    },
    {
        path: "/component",
        element: <ComponentPageLayout />,
        state: "component",
        sidebarProps: {
            displayText: "Components",
            icon: <AppsOutlinedIcon />
        },
        child: [
            {
                path: "/component/alert",
                element: <AlertPage />,
                state: "component.alert",
                sidebarProps: {
                    displayText: "Alert"
                },
            },
            {
                path: "/component/button",
                element: <ButtonPage />,
                state: "component.button",
                sidebarProps: {
                    displayText: "Button"
                }
            }
        ]
    },
    {
        path: "/changelog",
        element: <ChangelogPage />,
        state: "changelog",
        sidebarProps: {
            displayText: "Changelog",
            icon: <FormatListBulletedOutlinedIcon />
        }
    }
];

export default appRoutes;