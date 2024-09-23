import Footer from "./(user)/Footer";
import HeroSection from "./(user)/Hero";
import IntroVideo from "./(user)/IntroVideo";
import PeopleThink from "./(user)/PeopleThink";
import RecentArticles from "./(user)/RecentArticles";
import TopVideos from "./(user)/TopVideos";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4">
        <HeroSection />
        <IntroVideo />
        <TopVideos />
        <RecentArticles />
        <PeopleThink />
      </div>
      <Footer />
    </>
  );
}
