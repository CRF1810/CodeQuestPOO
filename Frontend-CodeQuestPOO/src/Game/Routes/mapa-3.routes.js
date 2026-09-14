import { useRoutes } from "react-router-dom"
import { gameRoutesMapa3 } from "../Mapas/CasteloDoCaos-Mapa3/RotasMapa-3"

export default function Mapa1(){
    const routes = useRoutes( gameRoutesMapa3 )
    return routes;
}
