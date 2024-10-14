import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Check } from "lucide-react";

interface ImportSource {
  name: string;
  logo: string;
  isImported: boolean;
}

const importSources: ImportSource[] = [
  {
    name: "Swiggy",
    logo: "https://cdn.worldvectorlogo.com/logos/swiggy-1.svg",
    isImported: true,
  },
  {
    name: "Uber",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJIOGtHi6yLhWs9gI0Bz1T83KoUzuqCQ7IQ&s",
    isImported: true,
  },
  {
    name: "Dunzo",
    logo: "https://seeklogo.com/images/D/dunzo-logo-FF49681C98-seeklogo.com.png",
    isImported: true,
  },
  {
    name: "Zomato",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-zomato-logo-icon-download-in-svg-png-gif-file-formats--food-company-brand-delivery-brans-logos-icons-1637644.png",
    isImported: false,
  },
  {
    name: "Urban Company",
    logo: "https://us1-photo.nextdoor.com/business_logo/43/ac/43aceb18fc9e049d7dd8fe386ffca1b6.png",
    isImported: false,
  },
  {
    name: "Ola",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtBF8Ykrp-0P0YUf-9ZsgzdA4Bj2Z4So3PvA&s",
    isImported: false,
  },
];

const ImportSourceTile: React.FC<ImportSource> = ({
  name,
  logo,
  isImported,
}) => (
  <div className="relative bg-white border-2 border-[#FFA500] rounded-md p-2 flex flex-col items-center justify-between aspect-square">
    <img src={logo} alt={name} className="w-14 h-14 mb-1 object-contain" />
    <span className="text-[10px] font-medium text-gray-800 text-center truncate w-full">
      {name}
    </span>
    {isImported && (
      <div className="absolute -top-1 -right-1 bg-[#4CAF50] rounded-full p-0.5 border border-white">
        <Check className="w-2 h-2 text-white" />
      </div>
    )}
  </div>
);

const ImportDataSection: React.FC = () => {
  return (
    <Card className="bg-white border ]">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Import Data</h2>
        <p className="mb-4 text-sm text-gray-700">
          🚀 Boost your trust score by importing data from various sources! 🌟
          Connect more apps to unlock exciting opportunities! 💼
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
          {importSources.map((source) => (
            <ImportSourceTile
              key={source.name}
              name={source.name}
              logo={source.logo}
              isImported={source.isImported}
            />
          ))}
        </div>
        <Button className="w-full bg-[#FFA500] hover:bg-[#FFB733] text-white">
          <Search className="w-4 h-4 mr-2" />
          Find More Apps to Connect
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImportDataSection;
