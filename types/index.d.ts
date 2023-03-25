interface DailyReflections {
  dailyReflections: DailyReflection[];
}

interface DailyReflection {
  id: number;
  date: string;
  title: string;
  quote: string;
  source: string;
  reflection: string;
}