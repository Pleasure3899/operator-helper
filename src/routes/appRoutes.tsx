import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import { RouteType } from "./config";
import MapPage from "../pages/dashboard/MapPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ManagePageLayout from "../pages/component/ManagePageLayout";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ObjectsPage from "../pages/component/ObjectsPage";
import PatrolsPage from "../pages/component/PatrolsPage";
import PatrolmenPage from "../pages/component/PatrolmenPage";
import ClientsPage from "../pages/component/ClientsPage";


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
            displayText: "Компоненти",
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
                    displayText: "Мапа"
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
        path: "/manage",
        element: <ManagePageLayout />,
        state: "manage",
        sidebarProps: {
            displayText: "Управління",
            icon: <AppsOutlinedIcon />
        },
        child: [
            {
                path: "/manage/objects",
                element: <ObjectsPage />,
                state: "manage.objects",
                sidebarProps: {
                    displayText: "Об'єкти"
                },
            },
            {
                path: "/manage/patrols",
                element: <PatrolsPage />,
                state: "manage.patrols",
                sidebarProps: {
                    displayText: "Бригади"
                }
            },
            {
                path: "/manage/patrolmen",
                element: <PatrolmenPage />,
                state: "manage.patrolmen",
                sidebarProps: {
                    displayText: "Патрульні"
                }
            },
            {
                path: "/manage/clients",
                element: <ClientsPage />,
                state: "manage.clients",
                sidebarProps: {
                    displayText: "Клієнти"
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