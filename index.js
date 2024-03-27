const express = require("express");

const cors = require("cors");

const app = express();

const socialMediaCreators = [
  {
    id: 1,
    name: "Shirhaan",
    email: "john@gmail.com",
    platform: "Instagram",
    followers: 10000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [
      { name: "Facebook", url: "https://www.facebook.com/example" },
      { name: "Instagram", url: "https://www.instagram.com/example" },
    ],
    status: "approved",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,

    approvedPosts: [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/300",
        caption: "Approved post 1 caption",
        platform: "Instagram",
        likes: 100,
        comments: 20,
        flags: 2,
      },
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/300",
        caption: "Approved post 2 caption",
        platform: "Instagram",
        likes: 150,
        comments: 30,
        flags: 1,
      },
      // Add more approved posts as needed...
    ],

    flaggedPosts: [
      {
        id: 1,
        imageUrl: "https://via.placeholder.com/300",
        caption: "Flagged post 1 caption",
        platform: "Instagram",
        likes: 50,
        comments: 10,
        flags: 5,
      },
      {
        id: 2,
        imageUrl: "https://via.placeholder.com/300",
        caption: "Flagged post 2 caption",
        platform: "Instagram",
        likes: 80,
        comments: 15,
        flags: 3,
      },
      // Add more flagged posts as needed...
    ],
  },
  {
    id: 2,
    name: "Heera",
    email: "jane@gmail.com",
    platform: "YouTube",
    followers: 50000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [{ name: "Twitter", url: "https://twitter.com/example" }],
    status: "rejected",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,
  },
  {
    id: 3,
    name: "Shridhar",
    email: "alice@gmail.com",
    platform: "TikTok",
    followers: 2000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [
      { name: "Facebook", url: "https://www.facebook.com/example" },
      { name: "Instagram", url: "https://www.instagram.com/example" },
      { name: "Twitter", url: "https://twitter.com/example" },
    ],
    status: "pending",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,
  },
  {
    id: 4,
    name: "Avi",
    email: "bob@gmail.com",
    platform: "Twitter",
    followers: 15000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [
      { name: "Facebook", url: "https://www.facebook.com/example" },
      { name: "Instagram", url: "https://www.instagram.com/example" },
      { name: "Twitter", url: "https://twitter.com/example" },
    ],
    status: "approved",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,
  },
  {
    id: 5,
    name: "Saurabh",
    email: "bob@gmail.com",
    platform: "Twitter",
    followers: 15000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [
      { name: "Facebook", url: "https://www.facebook.com/example" },
      { name: "Instagram", url: "https://www.instagram.com/example" },
      { name: "Twitter", url: "https://twitter.com/example" },
    ],
    status: "rejected",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,
  },
  {
    id: 6,
    name: "Parnab",
    email: "",
    platform: "Twitter",
    followers: 15000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [
      { name: "Facebook", url: "https://www.facebook.com/example" },
      { name: "Instagram", url: "https://www.instagram.com/example" },
      { name: "Twitter", url: "https://twitter.com/example" },
    ],
    status: "pending",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,
  },
  {
    id: 7,
    name: "Ankita",
    email: "john@gmail.com",
    platform: "Twitter",
    followers: 15000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [
      { name: "Facebook", url: "https://www.facebook.com/example" },
      { name: "Instagram", url: "https://www.instagram.com/example" },
      { name: "Twitter", url: "https://twitter.com/example" },
    ],
    status: "pending",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,
  },
  {
    id: 8,
    name: "Mayur",
    email: "bob@gmail.com",
    platform: "Twitter",
    followers: 15000,
    imageUrl: "https://via.placeholder.com/150",
    platforms: [
      { name: "Facebook", url: "https://www.facebook.com/example" },
      { name: "Instagram", url: "https://www.instagram.com/example" },
      { name: "Twitter", url: "https://twitter.com/example" },
    ],
    status: "approved",
    score: 500,
    totalFlags: 10,
    severeFlags: 3,
  },
];

app.use(cors());

app.use(express.json());

app.get("/creators", (req, res) => {
  let filteredCreators = socialMediaCreators;

  if (req.query.platform) {
    const platform = req.query.platform.toLowerCase();
    filteredCreators = filteredCreators.filter(
      (creator) => creator.platform.toLowerCase() === platform
    );
  }

  if (req.query.minFollowers) {
    const minFollowers = parseInt(req.query.minFollowers);
    filteredCreators = filteredCreators.filter(
      (creator) => creator.followers >= minFollowers
    );
  }

  res.json(filteredCreators);
});

app.get("/creators/:creatorId", (req, res) => {
  const creatorId = +req.params.creatorId;

  // Find the creator with the given ID
  const creator = socialMediaCreators.find(
    (creator) => creator.id === creatorId || creator.username === creatorId
  );

  // Check if the creator exists
  if (!creator) {
    return res.status(404).json({ error: "Creator not found" });
  }

  setTimeout(() => {
    res.json(creator);
  }, 2000);
});

app.post("/creators", (req, res) => {
  // Extract filter values from request body
  console.log(req.body);
  const { minFollowers, maxFollowers, minScore, maxScore, status, platforms } =
    req.body;

  // Apply filters to social media creators
  let filteredCreators = socialMediaCreators;

  // Filter by minimum followers
  if (minFollowers) {
    const minFollowersValue = parseInt(minFollowers);
    filteredCreators = filteredCreators.filter(
      (creator) => creator.followers >= minFollowersValue
    );
  }

  // Filter by maximum followers
  if (maxFollowers) {
    const maxFollowersValue = parseInt(maxFollowers);
    filteredCreators = filteredCreators.filter(
      (creator) => creator.followers <= maxFollowersValue
    );
  }

  // Filter by minimum score
  if (minScore) {
    const minScoreValue = parseInt(minScore);
    // Assuming `score` property exists in the creator object
    filteredCreators = filteredCreators.filter(
      (creator) => creator.score >= minScoreValue
    );
  }

  // Filter by maximum score
  if (maxScore) {
    const maxScoreValue = parseInt(maxScore);
    // Assuming `score` property exists in the creator object
    filteredCreators = filteredCreators.filter(
      (creator) => creator.score <= maxScoreValue
    );
  }

  // Filter by status
  if (status) {
    // Assuming `status` property exists in the creator object
    filteredCreators = filteredCreators.filter(
      (creator) => creator.status === status
    );
  }

  // Filter by multiple platforms
  if (platforms && Array.isArray(platforms)) {
    filteredCreators = filteredCreators.filter((creator) =>
      platforms.every((platform) =>
        creator.platforms.some(
          (creatorPlatform) => creatorPlatform.name === platform
        )
      )
    );
  }

  setTimeout(() => {
    res.json(filteredCreators);
  }, 2000);
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
