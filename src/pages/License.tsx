import { motion } from "framer-motion";

export const License = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-20 flex-col flex gap-14 px-2"
    >
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <span className="text-gray-500">Last updated: 7/4/2024</span>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Content Ownership</h1>
        <p className="text-gray-500">
          Unless otherwise stated, all materials on Digitalकथा are owned by
          Digitalकथा or its licensors. All rights reserved.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Usage Restrictions</h1>
        <ul className="list-disc font-semibold text-xl">
          You may:
          <li className="ml-10 text-lg font-normal text-gray-500">
            View and print content for personal use only.
          </li>
        </ul>
        <ul className="list-disc font-semibold text-xl">
          You must not:
          <li className="ml-10 text-lg font-normal text-gray-500">
            Republish, sell, rent, or sublicense material.
          </li>
          <li className="ml-10 text-lg font-normal text-gray-500">
            Reproduce, duplicate, or copy material.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Hyperlinks</h1>
        <p className="text-gray-500">
          You may link to our website, provided it is done so in a manner that
          is fair and legal, and does not imply any endorsement or affiliation.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Trademark Use</h1>
        <p className="text-gray-500">
          Use of Digitalकथा's logo or other artwork requires prior written
          permission.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Changes</h1>
        <p className="text-gray-500">
          We may update this license page from time to time. Check back
          periodically for updates.
        </p>
      </div>
    </motion.div>
  );
};
