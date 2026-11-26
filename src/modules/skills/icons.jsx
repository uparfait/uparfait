import { FaBalanceScale, FaBolt, FaBug, FaCode, FaCodeBranch, FaCubes, FaDatabase, FaDocker, FaExclamationTriangle, FaFilter, FaInfinity, FaPlug, FaServer, FaShieldAlt, FaSitemap, FaStream, FaUserLock, FaVial } from "react-icons/fa";
import { MdQueue, MdSpeed } from "react-icons/md";
import { SiServerless } from "react-icons/si";
import { TbApi, TbDatabaseCog } from "react-icons/tb";

export const icons = {
  serverless: <SiServerless />,
  vcs: <FaCodeBranch />,
  rateLimit: <MdSpeed />,
  loadBalance: <FaBalanceScale />,
  microservices: <FaCubes />,
  cicd: <FaInfinity />,
  errors: <FaExclamationTriangle />,
  queues: <MdQueue />,
  caching: <FaBolt />,
  testing: <FaVial />,
  api: <TbApi />,
  databases: <FaDatabase />,
  docker: <FaDocker />,
  auth: <FaUserLock />,
  debugging: <FaBug />,
  programming: <FaCode />,
  bottlenecks: <FaFilter />,
  pipelines: <FaStream />,
  architecture: <FaSitemap />,
  integration: <FaPlug />,
  performance: <FaShieldAlt />,
  dbOptimize: <TbDatabaseCog />,
  backend: <FaServer />,
};
