const express = require("express");

const cors = require("cors");

const app = express();

const approvedPosts = [];
const flaggedPosts = [];
const platforms = ["Instagram", "Twitter", "Facebook"]; 


for (let i = 1; i <= 20; i++) {

  const randomPlatformIndex = Math.floor(Math.random() * platforms.length);
  const platform = platforms[randomPlatformIndex];
  
  approvedPosts.push({
    id: i,
    imageUrl: `https://via.placeholder.com/300?text=Approved+post+${i}`,
    caption: `Post ${i}`,
    platform: platform,
    likes: Math.floor(Math.random() * 1000), // Random number of likes
    comments: Math.floor(Math.random() * 100), // Random number of comments
    flags: Math.floor(Math.random() * 5), // Random number of flags
  });

  flaggedPosts.push({
    id: i,
    imageUrl: `https://via.placeholder.com/300?text=Flagged+post+${i}`,
    caption: `Post ${i}`,
    platform: platform,
    likes: Math.floor(Math.random() * 1000), // Random number of likes
    comments: Math.floor(Math.random() * 100), // Random number of comments
    flags: Math.floor(Math.random() * 5), // Random number of flags
  });
}

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

    approvedPosts: approvedPosts,

    flaggedPosts: flaggedPosts,
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
    approvedPosts: approvedPosts,
    flaggedPosts: flaggedPosts,
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
    approvedPosts: approvedPosts,
    flaggedPosts: flaggedPosts,
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
    approvedPosts: approvedPosts,
    flaggedPosts: flaggedPosts,
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
    approvedPosts: approvedPosts,
    flaggedPosts: flaggedPosts,
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
    approvedPosts: approvedPosts,
    flaggedPosts: flaggedPosts,
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
    approvedPosts: approvedPosts,
    flaggedPosts: flaggedPosts,
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
    approvedPosts: approvedPosts,
    flaggedPosts: flaggedPosts,
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

  res.json(creator);
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

  
  res.json(filteredCreators);
  
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
