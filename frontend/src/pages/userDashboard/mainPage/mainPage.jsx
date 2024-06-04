import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import DashboardItem from "./DashboardItem/DashboardItem";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LatestActivities from "./LatestActivities/LatestActivities";
import { motion } from "framer-motion";
import { getAlluserTransactions } from "../../../store/statistics/statisticsActions";
import { getAllAccounts } from "../../../store/accounts/accountsActions";

export default function MainPage() {
  const dispatch = useDispatch(); // Define dispatch
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [userId, setUserId] = useState(null);
  const statistics = useSelector((state) => state.statistics.statistics || {});
  const accounts = useSelector((state) => state.accounts.accounts || []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
      dispatch(getAlluserTransactions(user.id));
      dispatch(getAllAccounts(user.id));
    }
  }, [dispatch]);

  const totalBalance = accounts.reduce(
    (sum, account) => sum + (account.balance || 0),
    0
  );

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
            value={accounts.length}
          />
          <DashboardItem
            backgroundColor="#4A5568"
            icon={ReceiptLongOutlinedIcon}
            title="Total Transactions"
            value={statistics.totalTransactions || 0}
          />
          <DashboardItem
            backgroundColor="#2D3748"
            icon={AccountBalanceWalletOutlinedIcon}
            title="Current Balance"
            value={totalBalance}
          />
        </div>
      </motion.div>
    </div>
  );
}
