import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { consultationApi } from '@/services/api';
import { cn } from '@/lib/utils';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setError(null);
        console.log('Fetching consultations for user:', user);
        if (user?.userId) {
          console.log('User ID:', user.userId);
          const data = await consultationApi.getByClient(user.userId);
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
    {
      title: 'Total Consultations',
      value: consultations.length,
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Pending',
      value: consultations.filter((c: any) => c.status === 'PENDING').length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Completed',
      value: consultations.filter((c: any) => c.status === 'COMPLETED').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your legal consultations.</p>
        {error && (
          <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <CardTitle>Recent Consultations</CardTitle>
          <CardDescription>Your latest consultation bookings</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : consultations.length > 0 ? (
            <div className="space-y-4">
              {consultations.slice(0, 5).map((consultation: any) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Atty. {consultation.lawyer?.user?.name || consultation.lawyer?.name || 'Unknown Lawyer'}</p>
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
              <p className="text-gray-500 text-sm">Book your first consultation with a lawyer</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;


