import "./styles.css";
import PayrollTogether from "./Components/Buytogether";

export default function App() {
  const qbo_simple_start = {
    lang: "en-ca",
    // productName: "QBO_SIMPLE_START",
    mySelectedPlanTitle: "MY SELECTED PLAN",
    // selectedPlan: "EasyStart",
    planDiscountTitle: "Save 50% for 3 months",
    payrollTitle: "Add Payroll (optional)",
    payrollDescription:
      "Manage your accounting and payroll in one place. Cancel anytime.",
    employeeLabel: "employee",
    perEmployeePrice: 3,
    featureList: [
      "Run payroll & calculate taxes",
      "Pay & deduction tracking",
      "Payroll reports",
      "Direct deposit",
      "File & pay taxes",
      "Year end forms",
      "Records of employment",
      "Employee access",
      "Free onboarding assistance",
      "Print pay cheques",
      "Time Tracking",
      "Project Costing"
    ],
    monthLabel: "mo",
    totalLabel: "Total",
    taxLabel: "+ applicable tax",
    buttonLabel: "Continue"
  };
  return (
    <>
      <PayrollTogether
        {...qbo_simple_start}
        productName="QBO_SIMPLE_START"
        selectedPlan="EasyStart"
      />
      <PayrollTogether
        {...qbo_simple_start}
        productName="QBO_ESSENTIALS"
        selectedPlan="Essentials"
      />
      <PayrollTogether
        {...qbo_simple_start}
        productName="QBO_PLUS"
        selectedPlan="Plus"
      />
    </>
  );
}
