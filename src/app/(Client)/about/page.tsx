import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Building2, 
  Award,
  Calendar,
  Globe,
  Phone,
  Mail
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Wai",
  description: "Learn about Wai, its history, culture, and the services provided by Panchayat Samiti Wai",
};

const AboutPage = () => {
  // TODO: Make this content dynamic from admin panel
  const stats = [
    { label: "Villages", value: "120+", icon: MapPin },
    { label: "Population", value: "2.5L+", icon: Users },
    { label: "Departments", value: "6", icon: Building2 },
    { label: "Active Schemes", value: "50+", icon: Award },
  ];

  const highlights = [
    {
      title: "Dakshin Kashi",
      description: "Wai is often called 'Dakshin Kashi' due to its numerous ancient temples and religious significance.",
    },
    {
      title: "Krishna River",
      description: "Located on the banks of the sacred Krishna River, providing natural beauty and agricultural benefits.",
    },
    {
      title: "Historical Importance", 
      description: "Rich historical heritage with connections to Maratha empire and various dynasties.",
    },
    {
      title: "Educational Hub",
      description: "Known for quality educational institutions and literacy initiatives.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-govt-blue mb-4">
          About Wai
        </h1>
        <p className="text-gray-600 text-lg">
          Discover the rich heritage and vibrant culture of Wai, Maharashtra
        </p>
      </div>

      {/* Hero Image & Introduction */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-govt-blue mb-4">
              Welcome to Wai
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wai is a historic town in Satara district of Maharashtra, India. Located on the banks of 
              the Krishna River, it's renowned for its ancient temples, scenic beauty, and rich cultural heritage. 
              The town is often referred to as "Dakshin Kashi" due to its numerous temples and religious significance.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Panchayat Samiti Wai serves as the administrative body responsible for rural development 
              in the Wai region, implementing various government schemes and initiatives to improve the 
              quality of life for its residents.
            </p>
            <Badge className="bg-govt-blue text-white">
              Established: 1961
            </Badge>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/wai-landscape.jpg"
              alt="Scenic view of Wai"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-govt-blue mb-6 text-center">
          Wai at a Glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-govt-blue/10 rounded-full">
                  <stat.icon className="h-6 w-6 text-govt-blue" />
                </div>
              </div>
              <div className="text-2xl font-bold text-govt-blue mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Highlights */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-govt-blue mb-6">
          Key Highlights
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-govt-blue mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {highlight.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Geography & Location */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-govt-blue mb-4">
              Geography & Location
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-govt-blue mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-gray-600">Satara District, Maharashtra, India</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-govt-blue mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Coordinates</div>
                  <div className="text-gray-600">17.95°N, 73.89°E</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-govt-blue mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Area</div>
                  <div className="text-gray-600">Covers 120+ villages in the region</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/wai-map.jpg"
              alt="Map of Wai region"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services & Functions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-govt-blue mb-6">
          Panchayat Samiti Services
        </h2>
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-govt-blue mb-3">
                Primary Functions
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Rural development and infrastructure</li>
                <li>• Implementation of government schemes</li>
                <li>• Healthcare and education initiatives</li>
                <li>• Agricultural development and support</li>
                <li>• Water resource management</li>
                <li>• Women and child development programs</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-govt-blue mb-3">
                Departments
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Rural Development</li>
                <li>• Education</li>
                <li>• Health & Family Welfare</li>
                <li>• Agriculture</li>
                <li>• Water Resources</li>
                <li>• Women & Child Development</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Contact Information */}
      <section className="mb-12">
        <Card className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-govt-blue mb-6">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-govt-blue mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Office Address</div>
                  <div className="text-gray-600">
                    Panchayat Samiti Wai<br />
                    Satara District<br />
                    Maharashtra - 412803
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-govt-blue mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-600">02162-234567</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-govt-blue mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-600">office@wai.gov.in</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-govt-blue mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Office Hours</div>
                  <div className="text-gray-600">
                    Monday - Friday: 10:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* TODO Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-yellow-900 mb-1">Content Management</p>
            <p className="text-yellow-700">
              <strong>TODO:</strong> This content will be made dynamic and editable from the admin panel 
              in future updates. Currently using static content for demonstration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
