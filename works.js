/* ============================================================
   EDIT THIS FILE ONLY — it controls all the content of the site.
   - Images live in the /assets folder (see assets/PUT-IMAGES-HERE.txt).
   - "url" is the link opened when a visitor clicks a work.
     Leave it as "" for works that have no link yet.
   - "status" (optional) shows a small badge on the work.
   - To add a work: copy one { ... } block. To remove one: delete it.
   ============================================================ */

window.SITE = {
  firstName: "Salma",
  lastName: "Ahmed",
  role: "Video Game Writer · Scriptwriter · Short Story Author",
  tagline: "Egyptian fiction and nonfiction writer with over four years of experience.",
  photo: "assets/image.jpeg",
  photoAlt: "Portrait of Salma Ahmed",
  heroAccent: "#ff3b30",
  email: "salmaahmed6sam@gmail.com",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/salma-ahmed-40198a1a2" },
    { label: "Instagram", url: "https://www.instagram.com/salma.ulven" },
    { label: "Non-Fiction Portfolio", url: "https://linktr.ee/SalmaAhmedwriter" }
  ],
  imageNotice: "Cover images are shown for presentation purposes only. Salma Ahmed does not own the copyrights to these images; all rights belong to their respective owners."
};

window.ABOUT = {
  kicker: "About me",
  title: "About",
  text: "Salma Ahmed is a 25-year-old Egyptian fiction and nonfiction writer with over four years of experience. She graduated from the Faculty of Arts with a major in English. Her short stories previously appeared in Amphibian Press, Vagabond City Lit, The Baram House, Paragraph Planet, and The Shallow Tales Review. She is also the main writer and a co-writer on several scripts and games.",
  facts: [
    { value: "4+", label: "Years of experience" }
  ],
  featuredIn: ["Amphibian Press", "Vagabond City Lit", "The Baram House", "Paragraph Planet", "The Shallow Tales Review"]
};

window.SECTIONS = [
  {
    id: "short-stories",
    title: "Short Stories",
    kicker: "Fiction",
    accent: "#b58cff",
    cta: "Read",
    intro: "Short fiction across literary, speculative and psychological genres.",
    works: [
      {
        title: "Between Here and There",
        type: "Short Story",
        description: "Historical literary fiction with psychological and social themes.",
        image: "assets/image8.jpeg",
        url: "https://theshallowtalesreview.com.ng/between-here-and-there-salma-ahmed/"
      },
      {
        title: "Count the Flowers",
        type: "Short Story",
        description: "Literary flash fiction with war and tragic elements.",
        image: "assets/image9.jpeg",
        url: "https://vagabondcitylit.com/2024/10/21/count-the-flowers-by-salma-ahmed/"
      },
      {
        title: "Bizarre Object",
        type: "Short Story",
        description: "Supernatural Gothic fiction with dark fantasy, psychological horror, and mystery elements.",
        image: "assets/image10.jpeg",
        url: "https://www.baramhouse.com/fiction/salma-ahmed/bizarre-object"
      },
      {
        title: "The Shop Down the Street",
        type: "Short Story",
        description: "Literary psychological fiction with social realist, existential, and tragic elements.",
        image: "assets/image11.jpeg",
        url: "https://thehooghlyreview.com/issues/issue-4/"
      },
      {
        title: "Mary Magdalene",
        type: "Short Story",
        description: "Literary psychological fiction with feminist, trauma-focused, and symbolic elements.",
        image: "assets/image12.jpeg",
        url: "https://issuu.com/3panelspress/docs/issue_04_-_the_women"
      },
      {
        title: "The Disappearance Of Om Sagda",
        type: "Short Story",
        description: "Literary psychological fiction with social realist, grief-centered, and suspenseful elements.",
        image: "assets/image13.jpeg",
        url: "https://efikomag.com/the-disappearance-of-om-sagda/"
      },
      {
        title: "The Things the War Could Not Bury",
        type: "Short Story",
        description: "Literary war fiction with tragic, psychological, and trauma-focused elements.",
        image: "assets/image14.jpeg",
        url: "https://www.meer.com/en/107406-the-things-the-war-could-not-bury"
      },
      {
        title: "Puppets Without Strings",
        type: "Short Story",
        description: "Psychological thriller with dystopian, satirical, and tragic elements.",
        image: "assets/image15.jpeg",
        url: "https://www.meer.com/en/107597-puppets-without-strings"
      },
      {
        title: "Inheritance of Hate Between a Mother and Son",
        type: "Short Story",
        description: "Literary psychological fiction with family drama and trauma-focused elements.",
        image: "assets/image16.jpeg",
        url: "https://www.meer.com/en/107964-inheritance-of-hate-between-a-mother-and-son"
      },
      {
        title: "Sarah’s Promise of Forever",
        type: "Short Story",
        description: "Dystopian science fiction with post-apocalyptic and tragic elements.",
        image: "assets/image17.jpeg",
        url: "https://www.meer.com/en/108174-sarahs-promise-of-forever"
      },
      {
        title: "Picking Rocks with Virginia Woolf",
        type: "Short Story",
        description: "Philosophical literary fiction with psychological, existential, and tragic elements.",
        image: "assets/image18.jpeg",
        url: "https://www.meer.com/en/108384-picking-rocks-with-virginia-woolf"
      }
    ]
  },
  {
    id: "scripts",
    title: "Scripts",
    kicker: "Script Writing",
    accent: "#ffb83d",
    cta: "Read",
    intro: "Scripts written as a co-writer and as an episode writer.",
    works: [
      {
        title: "(Plot) Armourless",
        type: "Script · Co-writer",
        status: "Still in Production",
        description: "",
        image: "assets/image1.jpeg",
        url: ""
      },
      {
        title: "The Fallen",
        type: "Script · Co-writer",
        status: "Still in Production",
        description: "",
        image: "assets/image2.jpeg",
        url: ""
      },
      {
        title: "Abnormal Advice",
        type: "Script · Writer for One Episode",
        status: "Still in Production",
        description: "",
        image: "assets/image3.jpeg",
        url: ""
      },
      {
        title: "Broadcast From the Backroom",
        type: "Script · Co-writer",
        status: "Still in Production",
        description: "",
        image: "assets/image4.jpeg",
        url: ""
      }
    ]
  },
  {
    id: "game-writing",
    title: "Game Writing",
    kicker: "Narrative Design",
    accent: "#2ee6c8",
    cta: "View",
    intro: "Game writing and narrative design for titles currently in development.",
    works: [
      {
        title: "Starry Station",
        type: "Game · Co-writer",
        status: "In Development",
        description: "",
        image: "assets/image5.jpeg",
        url: "https://store.steampowered.com/app/4666420/Starry_Station/"
      },
      {
        title: "Soul Sucker",
        type: "Game · Main Writer",
        status: "In Development",
        description: "",
        image: "assets/image6.jpeg",
        url: "https://store.steampowered.com/app/4820960/Soul_Sucker/"
      },
      {
        title: "Pralaya",
        type: "Game · Main Writer",
        status: "In Development",
        description: "",
        image: "assets/image7.jpeg",
        url: ""
      }
    ]
  }
];
