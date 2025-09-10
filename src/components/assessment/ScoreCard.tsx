import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  icon: string;
  interpretation: string;
}

export const ScoreCard = ({ title, score, description, icon, interpretation }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent", variant: "default" as const };
    if (score >= 60) return { text: "Good", variant: "secondary" as const };
    return { text: "Needs Development", variant: "destructive" as const };
  };

  const badge = getScoreBadge(score);

  return (
    <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          {title}
        </CardTitle>
        <Badge variant={badge.variant}>{badge.text}</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2 flex items-center gap-2">
          <span className={getScoreColor(score)}>{score}</span>
          <span className="text-sm text-muted-foreground font-normal">/100</span>
        </div>
        <Progress value={score} className="mb-3" />
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        <p className="text-sm text-foreground">{interpretation}</p>
      </CardContent>
    </Card>
  );
};