export const CARDS: Record<string, {
  name: string;
  title?: string;
  email: string;
  phone: string;
  links: string[];
}> = {
  demo: {
    name: "Demo Card",
    title: "Demo User",
    email: "demo@novatok.com",
    phone: "(555) 555-5555",
    links: ["Instagram", "X", "YouTube"],
  },
  jose: {
    name: "Jose Martinez",
    title: "Software Engineer",
    email: "jose@novatok.com",
    phone: "(555) 123-4567",
    links: ["LinkedIn", "GitHub", "Twitter"],
  },
};
