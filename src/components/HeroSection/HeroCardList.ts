import { Endpoints } from "src/types/Endpoints";

export const HeroCards = [
  {
    // Charizard
    fallback: '/video-buffering/charizard-immersive.png',
    imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1/A1_280_EN.webp",
    videoUrl: Endpoints.STORAGE_BUCKET(`videos/A1_280_EN.mp4`),
    mainColor: "#E56A44"
    // mainColor: "#E03021"
  },
  {
    // Pikachu
    fallback: "/video-buffering/pikachu-immersive.png",
    imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1/A1_281_EN.webp",
    videoUrl: Endpoints.STORAGE_BUCKET(`videos/A1_281_EN.mp4`),
    mainColor: "#E4C83D"
  },
  {
    // Metwtwo
    fallback: "/video-buffering/mewtwo-immersive.png",
    imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1/A1_282_EN.webp",
    videoUrl: Endpoints.STORAGE_BUCKET(`videos/A1_282_EN.mp4`),
    mainColor: "#A16CA9"
  },
  {
    // Celebi
    fallback: "/video-buffering/celebi-immersive.png",
    imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1a/A1a_085_EN.webp",
    videoUrl: Endpoints.STORAGE_BUCKET(`videos/A1A_85_EN.mp4`),
    mainColor: "#D1BF68"
  },
  {
    // Palkia
    fallback: "/video-buffering/palkia-immersive.png",
    imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A2/A2_204_EN.webp",
    videoUrl: Endpoints.STORAGE_BUCKET(`videos/A2_204_EN.mp4`),
    mainColor: "#2B7FFF"
  },
  {
    // Dialga
    fallback: "/video-buffering/dialga-immersive.png",
    imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A2/A2_205_EN.webp",
    videoUrl: Endpoints.STORAGE_BUCKET(`videos/A2_205_EN.mp4`),
    mainColor: "#D1BF68"
  }
]