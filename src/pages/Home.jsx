import Region from "../components/Region";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ opacity: 1 }}
    >
      <Region regionName="Asia" />
      <Region regionName="Europe" />
      <Region regionName="Africa" />
      <Region regionName="Oceania" />
      <Region regionName="North America" />
      <Region regionName="South America" />
    </motion.div>
  )
}

export default Home