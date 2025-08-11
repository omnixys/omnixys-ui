// mock/videos.ts
export const mockVideos = [
    {
      path: "videos/teaser.mp4",
      overlayText: "Omnixis — Summer Teaser",
      width: 1280,
      height: 720,
      quality: 80,
      controls: true,
      autoPlay: false,
      muted: false,
      loop: false,
      playsInline: true,
      posterPath: "posters/teaser_poster.jpg",
    },
    {
      path: "videos/product_intro.mp4",
      overlayText: "Produkt Intro",
      width: 1920,
      height: 1080,
      quality: 90,
      controls: true,
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      posterPath: "posters/product_intro_poster.jpg",
    },
];




// mock/images.ts
export const mockImages = [
    { path: "icons/infoMore.svg", alt: "Mehr Infos", w: 16, h: 16, tr: false },
    { path: "avatars/user_01.png", alt: "User Avatar 1", w: 64, h: 64, tr: true },
    { path: "banners/summer_sale.jpg", alt: "Summer Sale", w: 1200, h: 400, tr: true },
  ];


  // mock/postInteractions.ts
export const mockPostInteractions = {
    comments: 157,
    reposts: 157,
    likes: 157,
    isLiked: false,
    isBookmarked: false,
  };


// mock/post.ts
export const mockFileDetails = {
    width: 1200,
    height: 800,
    filePath: "general/post.jpeg",
    url: "https://example.com/general/post.jpeg",
    fileType: "image" as const,
    customMetadata: { sensitive: false },
  };

  export const mockPost = {
    author: { name: "Lama Dev", handle: "@lamaWebDev", avatarPath: "general/avatar.png" },
    repostedBy: "Lama Dev",
    createdFromNow: "1 day ago",
    createdAtAbs: "8:41 PM · Dec 5, 2024",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, animi. Laborum commodi aliquam alias molestias odio...",
    interactions: { comments: 157, reposts: 157, likes: 157, isLiked: false, isBookmarked: false },
  };



  export const mockPosts = [
    {
      type: "comment" as const,
      author: { name: "Lama Dev", handle: "@lamaWebDev", avatarPath: "general/avatar.png" },
      repostedBy: "Lama Dev",
      createdFromNow: "1 day ago",
      createdAtAbs: "8:41 PM · Dec 5, 2024",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, animi...",
      file: mockFileDetails,
      interactions: { comments: 157, reposts: 157, likes: 157, isLiked: false, isBookmarked: false },
    },
    {
      type: "status" as const,
      author: { name: "John Doe", handle: "@johnDoe", avatarPath: "general/avatar.png" },
      repostedBy: "Jane Smith",
      createdFromNow: "2 hours ago",
      createdAtAbs: "10:15 AM · Dec 6, 2024",
      text:
        "Status Update: Wir haben heute ein neues Feature gelauncht!",
      file: mockFileDetails,
      interactions: { comments: 45, reposts: 20, likes: 300, isLiked: true, isBookmarked: true },
    },
    {
      type: "comment" as const,
      author: { name: "Jane Smith", handle: "@janeSmith", avatarPath: "general/avatar.png" },
      repostedBy: "John Doe",
      createdFromNow: "5 hours ago",
      createdAtAbs: "6:50 AM · Dec 6, 2024",
      text:
        "Danke für das Teilen! Das neue Design sieht großartig aus.",
      file: mockFileDetails,
      interactions: { comments: 5, reposts: 1, likes: 25, isLiked: false, isBookmarked: false },
    },
    {
      type: "status" as const,
      author: { name: "Dev Team", handle: "@devteam", avatarPath: "general/avatar.png" },
      repostedBy: "Lama Dev",
      createdFromNow: "Yesterday",
      createdAtAbs: "3:20 PM · Dec 4, 2024",
      text:
        "Hier ist unser neuer Produkt-Trailer!",
      file: { ...mockFileDetails, fileType: "video" as const, filePath: "videos/product_intro.mp4" },
      interactions: { comments: 80, reposts: 50, likes: 1200, isLiked: true, isBookmarked: false },
    },
  ];
