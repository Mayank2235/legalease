import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { consultationApi } from '@/services/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const LawyerDashboard = () => {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setError(null);
        console.log('Fetching consultations for lawyer:', user);
        if (user?.userId) {
          console.log('Lawyer ID:', user.userId);
          const data = await consultationApi.getByLawyer(user.userId);
          console.log('Consultations data:', data);
          setConsultations(data);
        } else {
          console.log('No user ID available');
          setConsultations([]);
        }
      } catch (error: any) {
        console.error('Failed to fetch consultations:', error);
        setError(error?.response?.data?.message || error.message || 'Failed to fetch consultations');
        setConsultations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, [user]);

  const stats = [
    { title: 'Total Consultations', value: consultations.length, icon: Calendar, color: 'text-blue-600' },
    { title: 'Pending Requests', value: consultations.filter((c: any) => c.status === 'PENDING').length, icon: Clock, color: 'text-yellow-600' },
    { title: 'Completed', value: consultations.filter((c: any) => c.status === 'COMPLETED').length, icon: CheckCircle, color: 'text-green-600' },
    { title: 'Earnings', value: `$${consultations.filter((c: any) => c.status === 'COMPLETED').length * 100}`, icon: DollarSign, color: 'text-green-600' },
  ];

  const handleStatusUpdate = async (consultationId: string, status: string) => {
    try {
      await consultationApi.updateStatus(consultationId, status);
      const data = await consultationApi.getByLawyer(user!.userId);
      setConsultations(data);
    } catch (error: any) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update consultation status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Atty. {user?.name}!</h1>
        <p className="text-gray-600">Manage your consultations and client requests.</p>
        {error && (
          <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <stat.icon className={cn('h-8 w-8', stat.color)} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Consultation Requests</CardTitle>
          <CardDescription>Review and respond to client requests</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : consultations.filter((c: any) => c.status === 'PENDING').length > 0 ? (
            <div className="space-y-4">
              {consultations.filter((c: any) => c.status === 'PENDING').map((consultation: any) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{consultation.client?.user?.name || consultation.client?.name || 'Unknown Client'}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(consultation.scheduledAt).toLocaleDateString()} at {new Date(consultation.scheduledAt).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-500">{consultation.client?.user?.email || consultation.client?.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleStatusUpdate(consultation.id, 'CONFIRMED')}>Accept</Button>
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(consultation.id, 'REJECTED')}>Decline</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No pending requests</p>
              <p className="text-gray-500 text-sm">All consultation requests have been processed</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Consultations</CardTitle>
          <CardDescription>Your latest consultation activities</CardDescription>
        </CardHeader>
        <CardContent>
          {consultations.length > 0 ? (
            <div className="space-y-4">
              {consultations.slice(0, 5).map((consultation: any) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{consultation.client?.user?.name || consultation.client?.name || 'Unknown Client'}</p>
                    <p className="text-sm text-gray-600">{new Date(consultation.scheduledAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        consultation.status === 'PENDING' && 'bg-yellow-100 text-yellow-800',
                        consultation.status === 'CONFIRMED' && 'bg-blue-100 text-blue-800',
                        consultation.status === 'COMPLETED' && 'bg-green-100 text-green-800',
                        consultation.status === 'REJECTED' && 'bg-red-100 text-red-800'
                      )}
                    >
                      {consultation.status}
                    </span>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No consultations yet</p>
              <p className="text-gray-500 text-sm">Your consultation history will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerDashboard;


