export interface DailyReflection {
  id: number;
  date: string;
  title: string;
  quote: string;
  source: string;
  reflection: string;
}

export interface Loading {
  isLoading: boolean;
  isError: boolean;
}
