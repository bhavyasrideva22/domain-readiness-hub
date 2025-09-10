import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

interface WiscarRadarProps {
  scores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
}

export const WiscarRadar = ({ scores }: WiscarRadarProps) => {
  const data = [
    { name: 'Will', value: scores.will, fullMark: 100 },
    { name: 'Interest', value: scores.interest, fullMark: 100 },
    { name: 'Skill', value: scores.skill, fullMark: 100 },
    { name: 'Cognitive', value: scores.cognitive, fullMark: 100 },
    { name: 'Ability to Learn', value: scores.ability, fullMark: 100 },
    { name: 'Real-World Fit', value: scores.realWorld, fullMark: 100 },
  ];

  const overallAverage = Object.values(scores).reduce((a, b) => a + b, 0) / 6;

  return (
    <Card className="bg-gradient-card border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          WISCAR Framework Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your readiness across six key dimensions
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={data} cx="50%" cy="50%" innerRadius="20%" outerRadius="80%">
              <PolarAngleAxis type="category" dataKey="name" className="text-xs" />
              <RadialBar 
                dataKey="value" 
                cornerRadius={4} 
                fill="hsl(var(--primary))"
                className="opacity-80"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex justify-between items-center p-2 rounded bg-background/50">
              <span className="font-medium">{item.name}</span>
              <span className="text-primary font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-accent/30 border border-accent">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall WISCAR Score</span>
            <span className="text-lg font-bold text-primary">{Math.round(overallAverage)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};