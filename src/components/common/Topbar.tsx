import { AppBar, Typography, Toolbar } from "@mui/material"
import sizeConfigs from "../../configs/sizeConfigs"
import colorConfigs from "../../configs/colorConfigs"

const Topbar = () => {
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
                    Інформаційна технологія підтримки діяльності оператора пульта спостереження за складними об'єктами
                </Typography>
            </Toolbar>
        </AppBar>

    );
};

export default Topbar;