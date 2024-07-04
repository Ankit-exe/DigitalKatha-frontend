import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Projects = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-20 flex-col flex gap-14 px-2"
    >
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl flex">
          Explore Our Other
          <p className="ml-2 text-pink-500 font-bold hover:scale-105 transition-all duration-300">
            Projects
          </p>
        </h1>
        <p className="text-gray-500 text-base">
          Welcome to our Other Projects. Here, we showcase additional
          initiatives and collaborations that extend our mission of celebrating
          personal stories and connecting people through shared experiences.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">Current Projects</h1>
        <ul className="list-disc ml-10 flex flex-col gap-5">
          <div>
            <li className="text-xl font-semibold text-gray-600">Yatra:</li>
            <p className="text-gray-500 text-base">
              The "Yatra" mobile application is designed to enhance the
              commuting experience by providing real-time tracking of public
              vehicles. This niche focus requires a deep understanding of
              various aspects of mobile applications, such as user experience,
              personalization, trust and security, and regional optimization,
              all tailored to the unique needs of a public transportation
              tracking app. This literature review explores existing knowledge
              on these aspects, drawing on insights from relevant applications
              and studies.
            </p>
          </div>
          <div>
            <li className="text-xl font-semibold text-gray-600"> GharJagga:</li>
            <p className="text-gray-500 text-base">
              GharJagga, where we're passionate about helping you find your
              ideal home, property, or investment opportunity. Our journey began
              with a vision to simplify and elevate the real estate experience
              for both buyers and sellers. We believe that finding the perfect
              space should be an exciting and seamless process, and our
              dedicated team is here to make that vision a reality.
            </p>
          </div>
        </ul>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">Past Projects</h1>
        <ul className="list-disc ml-10 flex flex-col gap-5">
          <div>
            <li className="text-xl font-semibold text-gray-600">
              FreshMilk.com:
            </li>
            <p className="text-gray-500 text-base">
              The "Yatra" mobile application is designed to enhance the
              commuting experience by providing real-time tracking of public
              vehicles. This niche focus requires a deep understanding of
              various aspects of mobile applications, such as user experience,
              personalization, trust and security, and regional optimization,
              all tailored to the unique needs of a public transportation
              tracking app. This literature review explores existing knowledge
              on these aspects, drawing on insights from relevant applications
              and studies.
            </p>
          </div>
          <div>
            <li className="text-xl font-semibold text-gray-600">
              Nameste Bot:
            </li>
            <p className="text-gray-500 text-base">
              Nameste Bot was a versatile Discord bot designed to enhance server
              interaction. It featured commands for weather reports, GIF
              fetching, avatar display, server ping monitoring, message sniping,
              and fun interactions like kissing, hugging, and coin flipping.
              Additionally, it provided server and user information, enriching
              community engagement and server management capabilities.
            </p>
          </div>
        </ul>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-4xl">Get Involved</h1>
        <p className="text-gray-500 text-base">
          If you're interested in learning more about any of our projects or
          exploring collaboration opportunities, please don't hesitate to
          <Link to="/contact" className="text-pink-500 hover:underline px-1">
            contact
          </Link>
          . We're always excited to connect with like-minded individuals and
          organizations who share our passion for storytelling and community
          building.
        </p>
      </div>
      <div className="text-base text-gray-500">
        <p>Thank you for being here and for being part of Digitalकथा ❤️.</p>
      </div>
    </motion.div>
  );
};
