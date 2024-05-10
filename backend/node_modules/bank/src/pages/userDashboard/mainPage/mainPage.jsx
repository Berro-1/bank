import React from 'react'
import Sidebar from "../../../components/layout/hero/Sidebar";
import DashboardItem from "./DashboardItem/DashboardItem";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LatestActivities from "./LatestActivities/LatestActivities";
import { motion } from "framer-motion";

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <div className='w-1/5	'>
        <Sidebar/>

      </div>

    <div>
      <motion.div
        className="container mx-auto py-8 px-4 text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <GridViewOutlinedIcon className="text-4xl text-blue-500" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardItem
            backgroundColor="#2D3748" // Darker background
            icon={PersonOutlineOutlinedIcon}
            title="Total Accounts"
            value="123"
          />
          <DashboardItem
            backgroundColor="#4A5568" // Slightly lighter for contrast
            icon={ReceiptLongOutlinedIcon}
            title="Total Transactions"
            value="456"
          />
          <DashboardItem
            backgroundColor="#2D3748" // Darker background for uniformity
            icon={AccountBalanceWalletOutlinedIcon}
            title="Current Balance"
            value="789"
          />
        </div>
        <LatestActivities />
      </motion.div>
    </div>
    </div>
  )
}
