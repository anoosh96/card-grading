import Container from "@/components/common/Container";
import OurServices from "./components/OurServices";
import Addons from "./components/Addons";
import PricingTable from "./components/PricingTable";


export default async function ServicesAndPricingPage () {  
  return (
    <Container>
      <OurServices />
      <Addons />
      <PricingTable />
    </Container>
  )
}
