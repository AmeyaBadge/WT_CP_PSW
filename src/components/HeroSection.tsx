import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar from "./SearchBar";
import { MapPin, Users, Building, FileText } from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const quickStats = [
    {
      icon: <Building className="w-6 h-6" />,
      label: "Departments",
      value: "12+",
      color: "text-govt-blue",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: "Schemes",
      value: "50+",
      color: "text-govt-green",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Beneficiaries",
      value: "10,000+",
      color: "text-govt-saffron",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Villages",
      value: "45+",
      color: "text-govt-blue",
    },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/wai-landscape.jpg"
          alt="Beautiful landscape of Wai"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-govt-blue/70 via-govt-blue/60 to-govt-green/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-6">
            <Image
              src="/assets/National-Emblem-White.png"
              alt="National Emblem of India"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              पंचायत समिति वाई
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Panchayat Samiti Wai
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              सातारा जिल्हा, महाराष्ट्र | Satara District, Maharashtra
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Empowering rural communities through transparent governance,
            comprehensive welfare schemes, and sustainable development
            initiatives for the prosperity of Wai region.
          </p>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <SearchBar
              onSearch={onSearch}
              placeholder="Search for schemes, departments, or services..."
              className="bg-white/10 backdrop-blur-sm rounded-lg"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              asChild
              size="lg"
              className="bg-govt-saffron hover:bg-govt-saffron/90 text-white"
            >
              <Link href="/schemes">View All Schemes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-govt-blue"
            >
              <Link href="/departments">Explore Departments</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-govt-blue"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quickStats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-sm border-none"
              >
                <CardContent className="p-4 text-center">
                  <div className={`${stat.color} mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
