import { PlusCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="max-w-5xl mx-auto py-20 flex-col flex gap-14 px-2">
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl flex">
          Welcome to{" "}
          <p className="ml-1 text-pink-500 font-bold hover:scale-105 transition-all duration-300">
            Digital
          </p>
          कथा
        </h1>
        <p className="text-gray-500 text-base">
          At Digitalकथा, we believe that everyone has a story worth sharing.
          Whether it's a moment of triumph, a tale of overcoming adversity, or a
          simple yet profound experience that shaped who you are today, our
          platform is dedicated to capturing these narratives.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">Our Mission</h1>
        <p className="text-gray-500 text-base">
          We are here to provide a space where individuals from all walks of
          life can recount their personal stories. Our mission is to celebrate
          the diversity of human experiences, fostering empathy, connection, and
          understanding among our community members.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">Why Share Your Story?</h1>
        <p className="text-gray-500 text-base">
          Sharing your story can be incredibly empowering. It not only allows
          you to reflect on your own journey but also inspires others who may be
          going through similar challenges or moments of joy. By sharing, you
          contribute to a collective tapestry of human experiences that enriches
          and enlightens us all.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">How It Works</h1>
        <p className="text-gray-500 text-base">
          Submitting your story is easy. Simply click on
          <PlusCircleFilled className="px-1" />
          icon on your Home screen and start sharing your stories.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">Join Our Community</h1>
        <p className="text-gray-500 text-base">
          Whether you're here to read stories that resonate with you or to share
          your own, we invite you to become part of our community. Together,
          let's celebrate the power of storytelling and the uniqueness of each
          individual's journey.
        </p>

        <span className="text-gray-500 text-base">
          Join our Discord community :{" "}
          <Link
            to="https://discord.com/invite/Ta9W73raaJ"
            className="text-pink-500 hover:underline"
          >
            Join
          </Link>
        </span>
      </div>
      <div className="text-base text-gray-500">
        <p>Thank you for being here and for being part of Digitalकथा ❤️.</p>
      </div>
    </div>
  );
};
