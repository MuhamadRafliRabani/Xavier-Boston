import SocialButton from "./social-media-button";

const SocialMedia = () => {
  return (
    <div className="flex gap-5 justify-between w-full md:px-15">
      <SocialButton label="Instagram" videoUrl="/videos/ig.mp4" />
      <SocialButton label="YouTube" videoUrl="/videos/yt.mp4" />
      <SocialButton label="Unsplash" videoUrl="/videos/unsplash.mp4" />
      <SocialButton label="TikTok" videoUrl="/videos/tiktok.mp4" />
    </div>
  );
};

export default SocialMedia;
