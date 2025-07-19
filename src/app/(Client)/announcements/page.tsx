import { getPublicAnnouncements } from "@/actions/public/public.action";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  Bell, 
  FileText,
  Calendar,
  User
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Latest announcements and notices from Panchayat Samiti Wai",
};

const AnnouncementsPage = async () => {
  const announcements = await getPublicAnnouncements();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Alert":
        return <AlertCircle className="h-5 w-5" />;
      case "Notice":
        return <Bell className="h-5 w-5" />;
      case "Update":
        return <FileText className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Alert":
        return "bg-red-100 text-red-800 border-red-200";
      case "Notice":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Update":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-govt-blue mb-4">
          Announcements & Notices
        </h1>
        <p className="text-gray-600 text-lg">
          Stay updated with the latest announcements and notices from Panchayat Samiti Wai
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-govt-blue">{announcements.length}</div>
            <div className="text-gray-600">Total Announcements</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-govt-blue">
              {announcements.filter(a => a.type === "Alert").length}
            </div>
            <div className="text-gray-600">Alerts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-govt-blue">
              {announcements.filter(a => a.type === "Notice").length}
            </div>
            <div className="text-gray-600">Notices</div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      {announcements.length > 0 ? (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Type Icon & Badge */}
                <div className="flex items-center gap-3 md:flex-col md:items-center">
                  <div className={`p-2 rounded-full ${getTypeColor(announcement.type).replace('text-', 'bg-').replace('bg-', 'text-white bg-')}`}>
                    {getTypeIcon(announcement.type)}
                  </div>
                  <Badge className={`${getTypeColor(announcement.type)} border`}>
                    {announcement.type}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-govt-blue mb-2">
                    {announcement.title}
                  </h3>
                  
                  {announcement.content && (
                    <div className="text-gray-700 mb-4 leading-relaxed">
                      <p className="whitespace-pre-wrap">{announcement.content}</p>
                    </div>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(announcement.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>By {announcement.creator.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Bell className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements</h3>
          <p className="text-gray-500">
            There are no announcements available at the moment. Please check back later.
          </p>
        </div>
      )}

      {/* Note */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">Stay Updated</p>
            <p className="text-blue-700">
              Important announcements are also displayed on the homepage ticker. 
              For urgent matters, please contact the respective department directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
