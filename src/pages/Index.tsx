import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, Calendar, FileText } from 'lucide-react';
import ElevatorCard from '@/components/ElevatorCard';
import InspectionMap from '@/components/InspectionMap';

// Dados da inspeção periódica
const inspectionData = [
  {
    "DeviceID": "1P45336",
    "DeviceType": "Elevator",
    "Premises": "515 WEST 185 STREET",
    "Borough": "MANHATTAN",
    "Block": "2156",
    "Lot": "61",
    "Approved Date": "",
    "Status Date": "",
    "Floor From": "B",
    "Floor To": "6",
    "Periodic Inspection File Name": "",
    "Periodic Inspection Date": "07/17/2025",
    "Defect Exist?": "Yes",
    "Defects": [
      [
        {
          "Elevator Part": "Machine Brake",
          "Elevator Subpart": "59",
          "Violating Condition": "B - Insufficient",
          "Suggested Remedy": "07 - Provide",
          "Comments": "59 update brake maintenance tag"
        }
      ]
    ]
  },
  {
    "DeviceID": "1P45337",
    "DeviceType": "Elevator",
    "Premises": "515 WEST 185 STREET",
    "Borough": "MANHATTAN",
    "Block": "2156",
    "Lot": "61",
    "Approved Date": "",
    "Status Date": "",
    "Floor From": "B",
    "Floor To": "6",
    "Periodic Inspection File Name": "",
    "Periodic Inspection Date": "07/17/2025",
    "Defect Exist?": "No",
    "Defects": [
      []
    ]
  }
];

const Index = () => {
  const firstElevator = inspectionData[0];
  const elevatorWithDefects = inspectionData.filter(e => e["Defect Exist?"] === "Yes").length;
  const totalElevators = inspectionData.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Periodic Inspection Report</h1>
              <p className="text-primary-foreground/80">Elevators - Period 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Informações do Prédio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Building Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{firstElevator.Premises}</h3>
                  <p className="text-muted-foreground">{firstElevator.Borough}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Block</span>
                    <p className="text-sm">{firstElevator.Block}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Lot</span>
                    <p className="text-sm">{firstElevator.Lot}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Inspection Date: {firstElevator['Periodic Inspection Date']}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <InspectionMap 
                  address={firstElevator.Premises} 
                  borough={firstElevator.Borough} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo da Inspeção */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Inspection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{totalElevators}</div>
                <div className="text-sm text-muted-foreground">Total Elevators</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-destructive">{elevatorWithDefects}</div>
                <div className="text-sm text-muted-foreground">With Defects</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-success">{totalElevators - elevatorWithDefects}</div>
                <div className="text-sm text-muted-foreground">No Defects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Elevadores */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Elevator Details</h2>
          
          <div className="space-y-4">
            {inspectionData.map((elevator) => (
              <ElevatorCard key={elevator.DeviceID} elevator={elevator} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
