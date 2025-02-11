import Hero from "./components/home/Hero";
import Posts from "./components/home/Posts";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
export default function Home() {
  return (
    <div>
    
      <Navbar/>
      <Hero />
      <Posts />
    <Footer/>
  
    </div>
  );
}
