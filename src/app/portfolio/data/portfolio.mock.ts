// Pfad: data/portfolio.mock.ts

export interface PortfolioItem {
    id: number;
    gradient: [string, string]; // CSS-Farben für linear-gradient
    title: string;
    desc: string;
    img: string;
    link: string;
  }

  export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    {
      id: 1,
      gradient: ["rgba(248,113,113,0.6)", "rgba(147,197,253,0.6)"], // rot → blau
      title: "React Commerce",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
      img:
        "https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      link: "https://lama.dev",
    },
    {
      id: 2,
      gradient: ["rgba(147,197,253,0.6)", "rgba(196,181,253,0.6)"], // blau → violett
      title: "Next.js Medium Blog",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
      img:
        "https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      link: "https://lama.dev",
    },
    {
      id: 3,
      gradient: ["rgba(196,181,253,0.6)", "rgba(216,180,254,0.6)"], // violett → purple
      title: "Vanilla Book App",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
      img:
        "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      link: "https://lama.dev",
    },
    {
      id: 4,
      gradient: ["rgba(216,180,254,0.6)", "rgba(248,113,113,0.6)"], // purple → rot
      title: "Spotify Music App",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
      img:
        "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "https://lama.dev",
    },
  ];
