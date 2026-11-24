import { 
  GamepadIcon , 
  Trophy, 
  FolderCode, 
  VenetianMask 
} from "lucide-react";

export const sidebarLinks = [
  {
    id: "Mapas",
    icon: GamepadIcon,
    path: "/maps",
  },
  {
    id: "Desempenhos",
    icon: FolderCode,
    path: "/Erros",
  },
  {
    id: "Rankings",
    icon: Trophy, 
    path: "/leaderBoard",
  },
   {
    id: "Mentores",
    icon: VenetianMask,
    path: "/mentores",
  },
];
