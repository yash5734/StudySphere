import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import elipseImage1 from "../assets/Images/Ellipse1.png";
import elipseImage2 from "../assets/Images/Ellipse 2.png";
import elipseImage3 from "../assets/Images/Ellipse 3.png";
import Footer from "../components/Common/Footer";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import Instructor from "../components/core/HomePage/Instructor";
import ReviewSlider from "../components/Common/ReviewSlider";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* {section-> 1 } */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white">
        <Link to={"/signup"}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-semibold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit shadow-md shadow-pure-greys-500"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
              transition-all duration-200 group-hover:bg-richblack-900"
            >
              Beacome an Instructor
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-3xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" mt-4 w-[90%] text-center text-lg text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors
        </div>

        <div className="flex flex-row mt-5 gap-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book A Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 -z-10s relative vid1">
          <div>
            <img
              src={elipseImage2}
              width={"100%"}
              className="absolute bottom-[1%] -z-10 "
              alt="elipse "
            />
            <img
              src={elipseImage1}
              width={"100%"}
              className="absolute right-[12%] top-[2%] -z-10"
              alt="elipse "
            />
          </div>
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section1  */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              linkto: "/signup",
              active: true,
              btnText: "Try it Yourself",
            }}
            ctabtn2={{
              linkto: "/login",
              active: false,
              btnText: "Learn More",
            }}
            codeblock={[
              `<!DOCTYPE html>`,
              `<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>`,
              `h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`,
            ]}
            codeColor={"text-yellow-25"}
            backgroudGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* code section2  */}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              linkto: "/signup",
              active: true,
              btnText: "Try it Yourself",
            }}
            ctabtn2={{
              linkto: "/login",
              active: false,
              btnText: "Learn More",
            }}
            codeblock={[
              `<!DOCTYPE html>`,
              `<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>`,
              `h1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`,
            ]}
            codeColor={"text-yellow-25"}
            backgroudGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        <ExploreMore/>
      </div>


      {/* {section-> 2 } */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[410px]">
          <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto justify-center">
            <div className="flex flex-row gap-7 text-white mt-[250px]">
              <CTAButton linkto={"/signup"} active={true}>
                <div className="flex gap-2 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton linkto={"/login"} active={false}>
                <div className="flex gap-2 items-center">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-[120px] mt-[95px] mb-10">
            <div className="text-4xl  w-[45%] font-inter">
              Get the skills you need for a
              <HighlightText text={"job that is in deamand"} />
            </div>

            <div className="w-[40%] flex flex-col gap-10 items-start">
              <div className="text-[16px]  ">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton linkto={"/signup"} active={true}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* {section-> 3 } */}

      <div className=" mt-[200px] relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <Instructor />

        <h1 className="font-semibold text-4xl mt-[100px] text-center text-inter">
          Reviews From other Learner
        </h1>
        <ReviewSlider/>
      </div>

      {/* {Footer } */}

      <Footer />

    </div>
  );
};

export default Home;
