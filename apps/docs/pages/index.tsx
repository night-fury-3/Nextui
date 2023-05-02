import {DefaultLayout} from "@/layouts";
import {Hero, FeaturesGrid, CustomThemes, A11yOtb, DarkMode} from "@/components/marketing";
import landingContent from "@/content/landing";

const IndexPage = () => {
  return (
    <DefaultLayout>
      <Hero />
      <FeaturesGrid features={landingContent.topFeatures} />
      <CustomThemes />
      <A11yOtb />
      <DarkMode />
    </DefaultLayout>
  );
};

export default IndexPage;
