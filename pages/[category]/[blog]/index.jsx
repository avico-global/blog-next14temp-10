import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import Container from "../../components/common/Container";
import { ChevronRight } from "lucide-react";
import image1 from "../../../public/post4.webp";
import Post from "../../components/Blog/Post";
import RightBar from "@/pages/components/categories/RightBar";
import Footer from "@/pages/components/common/Footer";
import Link from "next/link";
export default function Blog() {
  const router = useRouter();
  const data = [
    {
      category: router.query.category,
      title: "Post 1",
      content: "Don’t dwell on mistakes",
      date: "MAY 2024",
      views: 100,
      image: image1,

      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    },
  ];
  const latestrightbar = [
    {
      image: image1,
      title: "Post 1",
      date: "MAY 2024",
    },
    {
      image: image1,
      title: "Post 1",
      date: "MAY 2024",
    },
    {
      image: image1,
      title: "Post 1",
      date: "MAY 2024",
    },
  ];

  const { category, blog } = router.query;

  return (
    <div>
      <Navbar />
      <div className="mt-10 md:mt-0">
        <Header />
      </div>
      {/* links */}
      <Container className="mt-10 flex gap-1 items-center md:w-[1000px] py-4 md:py-0 px-5">
        <Link href="/">Home</Link>
        <ChevronRight size={20} />
        <Link href={`/${category}`}>{blog}</Link>
        <ChevronRight size={20} />
        <Link href={`/${category}/${blog}`} className="text-gray-500">
          {category}
        </Link>
      </Container>

      {/* blog */}
      <Container className=" flex gap-1 items-center px-16 md:px-32 pb-4 md:py-0 ">
        <div className="flex flex-col lg:flex-row gap-12 ">
          <div className="flex flex-col lg:w-[70%]  gap-4">
            <Post data={data} />

            <p className="text-gray-500">
              1. Lift Others “We boost our own confidence as we build confidence
              in others,” says Dr. Gary Wood. ✅ Giving compliments to others
              boosts both their confidence and yours. ✅ This creates a
              positive-feedback loop, making you feel more confident. 2. Power
              Up “Practise a power pose, with arms raised, chin up, and chest
              out,” says therapist and coach Mr. David Waters. ✅ A strong
              posture mimics the stance of winners. ✅ It reduces
              anxiety-producing cortisol. ✅ It boosts confidence-enhancing
              testosterone. 3. Find the Right Fit “Nothing boosts
              self-confidence quite like wearing clothes that fit you
              perfectly,” says stylist Mr. Nick Hems. ✅ Well-fitted clothing
              enhances your comfort and confidence. ✅ Get your clothes altered
              for a perfect fit. 4. Redefine Yourself “One of the challenges a
              lot of people face is that they intertwine their identity with
              their work,” says Mr. Simon Sinek, author of Find Your Why. ✅
              Don’t define yourself solely by your job title. ✅ Instead, focus
              on your personal values and strengths. 5. Connect to Impress
              “Confidence is more about putting people at ease than holding
              court,” says Dr. Wood. ✅ Shift focus from performance to
              connection. ✅ In interviews, aim to connect with the interviewer
              rather than just impress them. 6. Take a Breath “Lengthening your
              out-breath relative to your in-breath counteracts the
              fight-or-flight response,” says Waters. ✅ Deep breathing calms
              racing thoughts. ✅ It helps instill a sense of confidence. 7.
              Stop Chronic Worrying “Chronic worry is a defense mechanism, but
              it leads to stress and lowers confidence,” says Dr. Nick Wignall.
              ✅ Learn to tolerate uncertainty. ✅ Accept that some things are
              beyond your control. 8. Stop Scrolling “Social media fosters
              negative comparisons that hurt confidence,” says Dr. Wood. ✅
              Confidence must come from within, not external validation. ✅
              Reduce time spent comparing yourself to others. 9. Learn to Say
              Enough “Use a powerful trigger word like ‘stop’ or ‘enough’ to
              curb negative self-talk,” says Waters. ✅ This technique from
              cognitive behavioral therapy (CBT) interrupts self-defeating
              thoughts. ✅ Saying the word out loud intensifies its effect. 10.
              Don’t Dwell on Mistakes “Instead of ruminating, learn to accept
              guilt, regret, and disappointment,” says Wignall. ✅ Building a
              healthier relationship with negative emotions prevents them from
              eroding confidence.
            </p>
          </div>
          <div className="lg:w-[30%] ">
            <RightBar image={image1} data={latestrightbar} />
          </div>
        </div>
      </Container>
      {/* footer */}
      <Footer />
    </div>
  );
}
