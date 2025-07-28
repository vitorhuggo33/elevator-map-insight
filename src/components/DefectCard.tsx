import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Defect {
  'Elevator Part': string;
  'Elevator Subpart': string;
  'Violating Condition': string;
  'Suggested Remedy': string;
  'Comments': string;
}

interface DefectCardProps {
  defects: Defect[];
  hasDefects: boolean;
}

const DefectCard: React.FC<DefectCardProps> = ({ defects, hasDefects }) => {
  if (!hasDefects || defects.length === 0) {
    return (
      <Card className="border-success bg-success/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-success font-medium">No defects found</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {defects.map((defect, index) => (
        <Card key={index} className="border-destructive bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Defect Identified
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Elevator Part:</span>
                <p className="text-sm">{defect['Elevator Part']}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-muted-foreground">Subpart:</span>
                <p className="text-sm">{defect['Elevator Subpart']}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-muted-foreground">Violating Condition:</span>
                <Badge variant="destructive" className="text-xs">
                  {defect['Violating Condition']}
                </Badge>
              </div>
              
              <div>
                <span className="text-sm font-medium text-muted-foreground">Suggested Remedy:</span>
                <p className="text-sm">{defect['Suggested Remedy']}</p>
              </div>
              
              {defect['Comments'] && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Comments:</span>
                  <p className="text-sm italic">{defect['Comments']}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DefectCard;