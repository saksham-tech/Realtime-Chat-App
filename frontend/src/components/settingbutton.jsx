import ThinSidebar from "./ThinSidebar";
import { Settings } from "lucide-react";


const SettingButton = () => {
  const { button } = ThinSidebar(); 
  return (
    <button className="w-10 h-10 flex items-center justify-center text-zinc-600">
      <Settings/>
    </button>
  );
};

export default SettingButton;
