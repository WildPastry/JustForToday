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

interface IExternalLink {
  children: JSX.Element;
  href: string;
  style: {};
}

interface IEditScreenInfo {
  path: string;
}
