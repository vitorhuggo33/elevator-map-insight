import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building, Calendar, Hash, MapPin } from 'lucide-react';
import DefectCard from './DefectCard';

interface Defect {
  'Elevator Part': string;
  'Elevator Subpart': string;
  'Violating Condition': string;
  'Suggested Remedy': string;
  'Comments': string;
}

interface ElevatorData {
  'DeviceID': string;
  'DeviceType': string;
  'Premises': string;
  'Borough': string;
  'Block': string;
  'Lot': string;
  'Approved Date': string;
  'Status Date': string;
  'Floor From': string;
  'Floor To': string;
  'Periodic Inspection File Name': string;
  'Periodic Inspection Date': string;
  'Defect Exist?': string;
  'Defects': Defect[][];
}

interface ElevatorCardProps {
  elevator: ElevatorData;
}

const ElevatorCard: React.FC<ElevatorCardProps> = ({ elevator }) => {
  const hasDefects = elevator['Defect Exist?'] === 'Yes';
  const allDefects = elevator.Defects.flat();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Elevator {elevator.DeviceID}
          </CardTitle>
          <Badge 
            variant={hasDefects ? "destructive" : "default"}
            className={hasDefects ? "" : "bg-success text-success-foreground"}
          >
            {hasDefects ? 'With Defects' : 'No Defects'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Informações básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <p className="text-sm pl-6">{elevator.Premises}</p>
            <p className="text-sm pl-6 text-muted-foreground">{elevator.Borough}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Identification</span>
            </div>
            <p className="text-sm pl-6">Block: {elevator.Block}</p>
            <p className="text-sm pl-6">Lot: {elevator.Lot}</p>
          </div>
        </div>

        <Separator />

        {/* Detalhes do elevador */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Floors</span>
            <p className="text-sm">{elevator['Floor From']} - {elevator['Floor To']}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-muted-foreground">Type</span>
            <p className="text-sm">{elevator.DeviceType}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-sm font-medium text-muted-foreground">Inspection</span>
              <p className="text-sm">{elevator['Periodic Inspection Date']}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Defeitos */}
        <div>
          <h4 className="text-sm font-medium mb-3">Inspection Status</h4>
          <DefectCard defects={allDefects} hasDefects={hasDefects} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ElevatorCard;