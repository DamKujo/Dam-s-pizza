export const getDeliveryPrice = (address: string | undefined): number => {
  if (!address) {
    console.log("worked with not city");
    return 0;
  } else {
    if (address.split(", ")[0].split(" ")[1] !== "Саратов") {
      console.log("worked with not saratov");
      return 799;
    } else {
      console.log("worked with saratov");
      return 299;
    }
  }
};
