import { NextPage } from "next";
import type { Metadata } from "next";
import RoundForm from "./RoundForm";

export const metadata: Metadata = {
  title: "DAM | Admin",
  description: "Start a round and set parameters for the upcoming rounds.",
};

const AdminPage: NextPage = async () => {
  return <RoundForm />;
};

export default AdminPage;
