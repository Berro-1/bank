import React from "react";
import { motion } from "framer-motion";

const DashboardItem = ({ backgroundColor, icon: Icon, title, value }) => {
  return (
    <motion.div 
    className="rounded-lg p-6 shadow-lg bg-white hover:scale-105 transition-transform duration-300"
    style={{ backgroundImage: backgroundColor }}
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between">
      {Icon && <Icon className="text-3xl" style={{ color: '#606470FF' }} />}
      <div>
        <h3 className="text-lg font-semibold" style={{ color: '#606470FF' }}>{title}</h3>
        <h2 className="text-2xl font-bold" style={{ color: '#606470FF' }}>{value}</h2>
      </div>
    </div>
  </motion.div>
  );
}
export default DashboardItem;
