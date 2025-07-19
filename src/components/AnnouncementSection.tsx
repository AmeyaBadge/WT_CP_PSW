"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, AlertCircle, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "General" | "Urgent" | "Event" | "Alert";
  createdAt: Date;
  isActive: boolean;
}

interface AnnouncementSectionProps {
  announcements?: Announcement[];
  maxItems?: number;
  showViewAll?: boolean;
}

const AnnouncementSection = ({
  announcements = [],
  maxItems = 3,
  showViewAll = true,
}: AnnouncementSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filter active announcements
  const activeAnnouncements = announcements.filter(
    (announcement) => announcement.isActive
  );

  // Auto-rotate announcements
  useEffect(() => {
    if (activeAnnouncements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [activeAnnouncements.length]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Urgent":
        return <AlertCircle className="w-4 h-4" />;
      case "Event":
        return <CalendarDays className="w-4 h-4" />;
      default:
        return <Megaphone className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "Event":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Alert":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  if (activeAnnouncements.length === 0) {
    return null;
  }

  const displayedAnnouncements = activeAnnouncements.slice(0, maxItems);

  return (
    <section className="w-full bg-gradient-to-r from-govt-saffron/5 to-govt-green/5 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-govt-blue flex items-center gap-2">
            <Megaphone className="w-6 h-6" />
            Latest Announcements
          </h2>
          {showViewAll && activeAnnouncements.length > maxItems && (
            <Button variant="outline" size="sm">
              View All
            </Button>
          )}
        </div>

        {/* Featured/Rotating Announcement */}
        {activeAnnouncements.length > 0 && (
          <Card className="mb-4 border-govt-saffron/20 bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-govt-saffron/10 text-govt-saffron">
                  {getTypeIcon(activeAnnouncements[currentIndex].type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={getTypeColor(
                        activeAnnouncements[currentIndex].type
                      )}
                    >
                      {activeAnnouncements[currentIndex].type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {activeAnnouncements[currentIndex].createdAt.toLocaleDateString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-govt-blue mb-2">
                    {activeAnnouncements[currentIndex].title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {activeAnnouncements[currentIndex].description}
                  </p>
                </div>
              </div>
              
              {/* Dots indicator for multiple announcements */}
              {activeAnnouncements.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {activeAnnouncements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex
                          ? "bg-govt-saffron"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to announcement ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Additional Announcements Grid */}
        {displayedAnnouncements.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedAnnouncements.slice(1).map((announcement) => (
              <Card
                key={announcement.id}
                className="border border-gray-200 hover:border-govt-saffron/30 transition-colors bg-white"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(announcement.type)}>
                      {announcement.type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {announcement.createdAt.toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <CardTitle className="text-base text-govt-blue">
                    {announcement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {announcement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementSection;
