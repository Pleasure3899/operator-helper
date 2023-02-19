import { AppBar, Typography, Toolbar } from "@mui/material"
import sizeConfigs from "../../configs/sizeConfigs"
import colorConfigs from "../../configs/colorConfigs"
import { useLocation } from 'react-router-dom';

const Topbar = () => {

    const location = useLocation()

    var pageName;

    if (location.pathname === "/dashboard/map") pageName="Мапа"
    if (location.pathname.includes("/dashboard/incidents")) pageName="Інциденти"
    if (location.pathname === "/manage/objects") pageName="Об'єкти"
    if (location.pathname === "/manage/patrols") pageName="Бригади"
    if (location.pathname === "/manage/patrolmen") pageName="Патрульні"
    if (location.pathname === "/manage/clients") pageName="Клієнти"
    if (!pageName) pageName="Інформаційна технологія підтримки діяльності оператора пульта спостереження за складними об'єктами"

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${sizeConfigs.sidebar.width})`,
                ml: sizeConfigs.sidebar.width,
                boxShadow: "unset",
                backgroundColor: colorConfigs.topbar.bg,
                color: colorConfigs.topbar.color,
                alignItems:"center"
            }}
        >
            <Toolbar>
                <Typography variant="h6" align="right">
                    {pageName}
                </Typography>
            </Toolbar>
        </AppBar>

    );
};

export default Topbar;