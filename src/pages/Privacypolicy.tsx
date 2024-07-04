import { motion } from "framer-motion";
export const Privacypolicy = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-20 flex-col flex gap-10 px-2"
    >
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <span className="text-gray-500">Last updated: 7/4/2024</span>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-gray-600 text-lg">
          Digitalकथा we operates the{" "}
          <a href="/" className="text-pink-500">
            digitalkatha.com
          </a>{" "}
          website
        </span>
        <p className="text-gray-600 text-lg">
          This page informs you of our policies regarding the collection, use,
          and disclosure of personal data when you use our Service and the
          choices you have associated with that data.
        </p>
        <p className="text-gray-600 text-lg">
          We use your data to provide and improve the Service. By using the
          Service, you agree to the collection and use of information in
          accordance with this policy. Unless otherwise defined in this Privacy
          Policy, terms used in this Privacy Policy have the same meanings as in
          our Terms and Conditions, accessible at{" "}
          <a href="/" className="text-pink-500">
            digitalkatha.com
          </a>
        </p>
        <div className="flex flex-col gap-5 mt-10">
          <span className="text-3xl font-semibold">
            Information Collection and Use
          </span>
          <p className="text-gray-600 text-lg">
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          <span className="text-3xl font-semibold">
            Types of Data Collected
          </span>
          <p className="text-gray-600 text-lg">
            <span className="text-xl font-semibold">Personal Data: </span>
            While using our Service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you ("Personal Data"). Personally identifiable information
            may include, but is not limited to:
            <div className="flex flex-col gap-2 font-semibold m-5">
              <span> Email address</span>
              <span>First name and last name</span>
              <span>Cookies and Usage Data</span>
              <span>Usage Data:</span>{" "}
            </div>
            <p className="text-gray-600 text-lg">
              We may also collect information on how the Service is accessed and
              used ("Usage Data"). This Usage Data may include information such
              as your computer's Internet Protocol address (e.g., IP address),
              browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers, and other diagnostic data.
            </p>
          </p>
        </div>
        <div className="flex flex-col mt-10">
          <span className="text-3xl font-semibold">Use of Data</span>
          <ul className="font-xl font-medium ml-10 mt-5 list-disc text-gray-600">
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service
              when you choose to do so
            </li>
            <li>To provide customer care and support</li>
            <li>
              To provide analysis or valuable information so that we can improve
              the Service
            </li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </div>
        <div className="flex flex-col mt-10 gap-5">
          <span className="text-3xl font-semibold">Changes to This Privacy Policy</span>
          <p className="text-gray-600 text-lg">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="text-gray-600 text-lg">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
