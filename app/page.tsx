import HeroBanner from "./components/home/HeroBanner";
import FeaturedCategories from "./components/home/FeaturedCategories";
import PopularCourses from "./components/home/PopularCourses";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <PopularCourses />
    </>
  );
}
