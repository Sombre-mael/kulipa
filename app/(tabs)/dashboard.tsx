import { View, Text } from "react-native";
import KpiCard from "@/components/dashboard/KpiCard";
import { mockInvoices } from "@/data/mockInvoices";

const totalRevenue = mockInvoices
  .filter((inv) => inv.status === "paid")
  .reduce((acc, inv) => acc + inv.total, 0);

const totalInvoices = mockInvoices.length;

const pendingAmount = mockInvoices
  .filter((inv) => inv.status !== "paid")
  .reduce((acc, inv) => acc + inv.total, 0)

const paidCount = mockInvoices
  .filter((inv) => inv.status === "paid").length

const pendingCount = mockInvoices
  .filter((inv) => inv.status !== "paid").length

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Tableau de bord
      </Text>
      <View style={{ marginTop: 20}}>
        <KpiCard 
        title="Total factures"
        value={totalInvoices.toString()}
        />
        <KpiCard 
        title="Revenus encaissés"
        value={(totalRevenue / 100).toFixed(2)}
        />
        <KpiCard 
        title="Montant en attente"
        value={(pendingAmount / 100).toFixed(2)}
        />
        <KpiCard 
        title="Nombres factures en attente"
        value={pendingCount.toString()}
        />
        <KpiCard 
        title="Nombres de factures payés"
        value={paidCount.toString()}
        />
      </View>
    </View>
  );
}