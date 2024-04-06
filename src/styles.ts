// styles.ts
interface Styles {
  [key: string]: string;
  paddingX: string;
  paddingY: string;
  padding: string;
  heroHeadText: string;
  heroSubText: string;
  sectionHeadText: string;
  sectionSubText: string;
  modalText: string;
  High: string;
  Medium: string;
  Low: string;
}

const styles: Styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-4 px-1 sm:py-4 py-1",
  heroHeadText:
    "text-center font-black text-white lg:text-[70px] sm:text-[50px] xs:text-[40px] text-[30px] lg:leading-[98px] mt-2",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[20px] text-[14px] text-secondary uppercase tracking-wider text-center font-bold",
  modalText:
    "sm:text-[18px] text-[14px] text-secondary text-center text-black",
  High: "bg-red-600",
  Medium: "bg-yellow-400",
  Low: "bg-blue-800",
};

export { styles };