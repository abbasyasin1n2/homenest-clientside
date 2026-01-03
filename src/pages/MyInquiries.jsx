import { useAuth } from '../contexts/AuthContext';
import { useUserInquiries } from '../hooks/useInquiries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FaPaperPlane, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

const MyInquiries = () => {
  const { user } = useAuth();
  const { data: inquiries = [], isLoading } = useUserInquiries(user?.email);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading your inquiries...</div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">My Inquiries</h1>
        <p className="text-muted-foreground">Messages you've sent to property owners</p>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FaPaperPlane className="mx-auto text-6xl text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No inquiries yet</h2>
            <p className="text-muted-foreground">
              When you contact property owners, your messages will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{inquiry.propertyName}</CardTitle>
                    <CardDescription>To: {inquiry.ownerName}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      inquiry.status === 'pending'
                        ? 'secondary'
                        : inquiry.status === 'replied'
                        ? 'default'
                        : 'outline'
                    }
                  >
                    {inquiry.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Your Message:</p>
                    <p className="text-gray-800 dark:text-gray-200">{inquiry.message}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FaEnvelope className="h-4 w-4" />
                      <span>{inquiry.ownerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FaPhone className="h-4 w-4" />
                      <span>{inquiry.senderPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FaClock className="h-4 w-4" />
                      <span>{format(new Date(inquiry.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInquiries;

