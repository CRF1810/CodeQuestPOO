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
    id: "Desempenhos de código",
    icon: FolderCode,
    path: "/Erros",
  },
  {
    id: "Placar de Líderes",
    icon: Trophy, 
    path: "/leaderBoard",
  },
   {
    id: "Mentores",
    icon: VenetianMask,
    path: "/mentores",
  },
];
