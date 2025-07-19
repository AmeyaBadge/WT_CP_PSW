import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Building2,
  Users,
  AlertCircle
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Panchayat Samiti Wai for any queries or assistance",
};

const ContactPage = () => {
  // TODO: Make this content dynamic from admin panel
  const departments = [
    {
      name: "Rural Development",
      head: "Shri. Vikram Joshi (BDO)",
      phone: "02162-234567",
      email: "rural_dev@wai.gov.in",
    },
    {
      name: "Education",
      head: "Dr. Meera Sharma",
      phone: "02162-234568", 
      email: "education@wai.gov.in",
    },
    {
      name: "Health",
      head: "Dr. Rajesh Patil",
      phone: "02162-234569",
      email: "health@wai.gov.in",
    },
    {
      name: "Agriculture",
      head: "Dr. Suresh Pawar",
      phone: "02162-234571",
      email: "agriculture@wai.gov.in",
    },
    {
      name: "Water Resources",
      head: "Shri. Sachin Jadhav",
      phone: "02162-234570",
      email: "water@wai.gov.in",
    },
    {
      name: "Women & Child Development",
      head: "Smt. Lata Jadhav",
      phone: "02162-234572",
      email: "wcd@wai.gov.in",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-govt-blue mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We're here to help! Reach out to us for any queries, assistance, or information 
          about government schemes and services.
        </p>
      </div>

      {/* Main Office Information */}
      <section className="mb-12">
        <Card className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-govt-blue mb-6">
                Main Office
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-govt-blue/10 rounded-full">
                    <MapPin className="h-5 w-5 text-govt-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      Panchayat Samiti Wai<br />
                      Near Wai Bus Stand<br />
                      Wai, Satara District<br />
                      Maharashtra - 412803
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-govt-blue/10 rounded-full">
                    <Phone className="h-5 w-5 text-govt-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">
                      Main Office: 02162-234567<br />
                      Helpline: 02162-234500
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-govt-blue/10 rounded-full">
                    <Mail className="h-5 w-5 text-govt-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">
                      General: office@wai.gov.in<br />
                      Grievances: grievance@wai.gov.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-govt-blue/10 rounded-full">
                    <Clock className="h-5 w-5 text-govt-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 10:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Image */}
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/assets/wai-landscape.jpg"
                alt="Panchayat Samiti Wai Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Department Contacts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-govt-blue mb-6">
          Department Contacts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-govt-blue/10 rounded-full">
                  <Building2 className="h-5 w-5 text-govt-blue" />
                </div>
                <h3 className="font-semibold text-govt-blue">{dept.name}</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{dept.head}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{dept.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{dept.email}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-12">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-govt-blue mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="bg-govt-blue hover:bg-govt-blue/90 h-auto p-4 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>Download Forms</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col">
              <MapPin className="h-6 w-6 mb-2" />
              <span>Get Directions</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col">
              <AlertCircle className="h-6 w-6 mb-2" />
              <span>File Grievance</span>
            </Button>
          </div>
        </Card>
      </section>

      {/* Important Notes */}
      <section className="mb-12">
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-bold text-govt-blue mb-4">
            Important Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-blue-800">
                <strong>Emergency Services:</strong> For urgent matters, please contact the respective 
                department directly or visit the office during working hours.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-blue-800">
                <strong>Response Time:</strong> We aim to respond to all queries within 2-3 working days. 
                For urgent matters, please call directly.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-blue-800">
                <strong>Visit Requirements:</strong> Please carry valid ID proof when visiting our office. 
                Some services may require prior appointment.
              </p>
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
              <strong>TODO:</strong> Contact information and department details will be made dynamic 
              and editable from the admin panel in future updates. Currently using static content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
