import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaAws,
} from "react-icons/fa";
import {
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiHeroku,
  SiFlask,
  SiDjango,
} from "react-icons/si";

const DevInfo = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Education and Experience Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white shadow-lg rounded-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Educational Background
          </h3>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Studies at Institute of Science and Technology (IST)</li>
            <li>Electronics and communication engineering(ECE)</li>
            <li>3rd Year</li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Experience</h3>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Full Stack Web-developer</li>
            <li>Airepro Solution Pvt. Ltd.</li>
            <li>February-2024 to Present</li>
            <li className="text-blue-500">Portfolio</li>
          </ul>
        </motion.div>
      </div>

      {/* Technologies Section */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-4">Technologies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Technologies */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Frontend</h4>
            <ul className="list-none text-gray-600 leading-relaxed flex flex-wrap gap-4">
              <li className="flex items-center space-x-2">
                <FaReact className="text-blue-500" size={24} />
                <span>React</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaHtml5 className="text-orange-500" size={24} />
                <span>HTML5</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCss3Alt className="text-blue-600" size={24} />
                <span>CSS3</span>
              </li>
            </ul>
          </div>

          {/* Backend Technologies */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Backend</h4>
            <ul className="list-none text-gray-600 leading-relaxed flex flex-wrap gap-4">
              <li className="flex items-center space-x-2">
                <FaNodeJs className="text-green-500" size={24} />
                <span>Node.js</span>
              </li>
              <li className="flex items-center space-x-2">
                <SiMongodb className="text-green-600" size={24} />
                <span>MongoDB</span>
              </li>
              <li className="flex items-center space-x-2">
                <SiMysql className="text-blue-500" size={24} />
                <span>MySQL</span>
              </li>
              <li className="flex items-center space-x-2">
                <SiPostgresql className="text-blue-700" size={24} />
                <span>PostgreSQL</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPython className="text-yellow-500" size={24} />
                <span>Python</span>
              </li>
              <li className="flex items-center space-x-2">
                <SiDjango className="text-green-800" size={24} />
                <span>Django</span>
              </li>
              <li className="flex items-center space-x-2">
                <SiFlask size={24} />
                <span>Flask</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">Tools & Cloud Services</h4>
          <ul className="list-none text-gray-600 leading-relaxed flex flex-wrap gap-4">
            <li className="flex items-center space-x-2">
              <SiGit className="text-red-600" size={24} />
              <span>Git</span>
            </li>
            <li className="flex items-center space-x-2">
              <SiGithub size={24} />
              <span>GitHub</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaAws className="text-yellow-500" size={24} />
              <span>AWS</span>
            </li>
            <li className="flex items-center space-x-2">
              <SiHeroku className="text-purple-500" size={24} />
              <span>Heroku</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default DevInfo;
