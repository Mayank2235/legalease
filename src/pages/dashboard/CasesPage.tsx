import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { consultationApi } from '@/services/api';

const CasesPage = () => {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (user?.userId) {
          const data = await consultationApi.getByLawyer(user.userId);
          setConsultations(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Cases</h1>
          <p className="text-gray-600">Track and manage your ongoing cases</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Case
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : consultations.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-8">No cases yet</div>
        ) : (
          consultations.map((c) => (
          <Card key={c.id} className="hover:shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                {c.client?.name || 'Client'} vs {c.lawyer?.name || 'You'}
              </CardTitle>
              <CardDescription>{new Date(c.scheduledAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="outline">{c.status}</Badge>
              <Button size="sm" variant="outline">View</Button>
            </CardContent>
          </Card>
        )))
        }
      </div>
    </div>
  );
};

export default CasesPage;


