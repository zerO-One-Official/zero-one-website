import User from "@/models/Users";

export const activateAccount = async (token) => {
  try {
    const user = await User.findOne({ token }).select("firstName");

    if (!user)
      return {
        message: "Invalid Token or Expired",
        type: "error",
        success: false,
      };

    return { user, type: "success", success: true };
  } catch (error) {
    console.log(error);
    return { message: error.message, type: "error", success: false };
  }
};
