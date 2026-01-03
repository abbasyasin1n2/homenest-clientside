import { useAuth } from '../contexts/AuthContext';
import { useOwnerInquiries, useUpdateInquiryStatus } from '../hooks/useInquiries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FaInbox, FaEnvelope, FaPhone, FaClock, FaHome } from 'react-icons/fa';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const ReceivedInquiries = () => {
  const { user } = useAuth();
  const { data: inquiries = [], isLoading } = useOwnerInquiries(user?.email);
  const updateStatus = useUpdateInquiryStatus();

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await updateStatus.mutateAsync({ id: inquiryId, status: newStatus });
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update status',
        text: error.response?.data?.message || 'Please try again',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading inquiries...</div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Received Inquiries</h1>
        <p className="text-muted-foreground">Messages from potential buyers/renters</p>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FaInbox className="mx-auto text-6xl text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No inquiries yet</h2>
            <p className="text-muted-foreground">
              When people contact you about your properties, messages will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry._id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaHome className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-lg">{inquiry.propertyName}</CardTitle>
                    </div>
                    <CardDescription>From: {inquiry.senderName}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={inquiry.status}
                      onValueChange={(value) => handleStatusChange(inquiry._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Message:</p>
                    <p className="text-gray-800 dark:text-gray-200">{inquiry.message}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FaEnvelope className="h-4 w-4" />
                      <span>{inquiry.senderEmail}</span>
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

                  <div className="flex gap-2">
                    <Button asChild variant="outline">
                      <a href={`mailto:${inquiry.senderEmail}`}>
                        <FaEnvelope className="mr-2 h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={`tel:${inquiry.senderPhone}`}>
                        <FaPhone className="mr-2 h-4 w-4" />
                        Call
                      </a>
                    </Button>
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

export default ReceivedInquiries;

