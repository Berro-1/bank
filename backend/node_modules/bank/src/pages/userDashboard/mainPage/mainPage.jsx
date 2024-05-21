import React, { useState } from "react";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import DashboardItem from "./DashboardItem/DashboardItem";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LatestActivities from "./LatestActivities/LatestActivities";
import { motion } from "framer-motion";

export default function MainPage() {
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <motion.div
        className="container mx-auto p-10 text-gray-100 bg-gray-800"
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
            backgroundColor="#2D3748"
            icon={PersonOutlineOutlinedIcon}
            title="Total Accounts"
            value="123"
          />
          <DashboardItem
            backgroundColor="#4A5568"
            icon={ReceiptLongOutlinedIcon}
            title="Total Transactions"
            value="456"
          />
          <DashboardItem
            backgroundColor="#2D3748"
            icon={AccountBalanceWalletOutlinedIcon}
            title="Current Balance"
            value="789"
          />
        </div>
        <LatestActivities
          accountId={selectedAccountId}
          onAccountSelect={setSelectedAccountId}
        />
      </motion.div>
    </div>
  );
}
