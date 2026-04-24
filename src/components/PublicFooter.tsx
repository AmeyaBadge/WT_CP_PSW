import Link from "next/link";
import Image from "next/image";

const PublicFooter = () => {
  return (
    <footer className="bg-govt-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-govt-saffron transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-govt-saffron transition"
                >
                  About Wai
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="hover:text-govt-saffron transition"
                >
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link
                  href="/departments"
                  className="hover:text-govt-saffron transition"
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  href="/announcements"
                  className="hover:text-govt-saffron transition"
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-govt-saffron transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Portals */}
          <div>
            <h3 className="text-xl font-bold mb-4">Government Portals</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-govt-saffron transition"
                >
                  India.gov.in
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-govt-saffron transition"
                >
                  Maharashtra.gov.in
                </Link>
              </li>
              <li>
                <Link
                  href="https://rtionline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-govt-saffron transition"
                >
                  RTI Online
                </Link>
              </li>
              <li>
                <Link
                  href="https://services.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-govt-saffron transition"
                >
                  National Government Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">Panchayat Samiti Wai</p>
              <p className="mb-2">Satara District, Maharashtra</p>
              <p className="mb-2">Phone: 02162-XXXXXX</p>
              <p className="mb-2">
                Email: wai.panchayatsamiti@maharashtra.gov.in
              </p>
            </address>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" aria-label="Facebook">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-govt-blue text-sm font-bold">f</span>
                </div>
              </Link>
              <Link href="#" aria-label="Twitter">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-govt-blue text-sm font-bold">t</span>
                </div>
              </Link>
              <Link href="#" aria-label="YouTube">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-govt-blue text-sm font-bold">y</span>
                </div>
              </Link>
            </div>
            <div className="relative h-32">
              <Image
                src="/assets/wai-map.jpg"
                alt="Map location of Panchayat Samiti Wai"
                fill
                className="object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Panchayat Samiti Wai. All Rights
            Reserved.
          </p>
          <div className="mt-4 pt-2 border-t border-gray-700/50">
            <p className="text-xs text-gray-300">
              Designed, Developed & Maintained by
            </p>
            <p className="mt-1 font-medium">
              Group 10
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
