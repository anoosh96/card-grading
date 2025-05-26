import Container from "@/components/common/Container";
import OurServices from "./components/OurServices";
import Addons from "./components/Addons";
import PricingTable from "./components/PricingTable";


export default async function ServicesAndPricingPage () {
  
  const res = await fetch(`${process.env.API_URL}/api/subscription/plans`, {
    cache: 'no-store' // optional: ensures fresh data on each request (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subscription plans");
  }

  const plans = await res.json();
  
  return (
    <Container>
      <OurServices services={plans.data} />
      <Addons />
      <PricingTable />
    </Container>
  )
}
