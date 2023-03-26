interface IDailyReflections {
  dailyReflections: IDailyReflection[];
}

interface IDailyReflection {
  id: number;
  date: string;
  title: string;
  quote: string;
  source: string;
  reflection: string;
}
