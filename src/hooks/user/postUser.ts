import axios from "axios";

export async function postUser(
  formData: {
    username: string;
    name: string;
    subtitle: string;
    password: string;
    about: string;
    email: string;
  },
  setNotification: React.Dispatch<React.SetStateAction<string>>,
  user: {
    image: string;
    email: string;
  },
  setUserModal:React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const userData = {
      username: formData.username.toLocaleLowerCase(),
      name: formData.name,
      subtitle: formData.subtitle,
      password: formData.password,
      about: formData.about,
      image: user.image,
      email: formData.email,
    };

    if (!userData.username || !userData.name || !userData.password) {
      throw new Error("Missing required fields");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_KEY}/users`,
      userData
    );

    
    if (response.status === 201) {
      setNotification("User created successfully!");
      setUserModal(false)
      return response.data
    } else {
      setNotification("Failed to create user.");
    }
  } catch (error: any) {
    console.error("Error submitting user data:", error);
    setNotification(
      error.response?.data?.error ||
        error.message ||
        "An unknown error occurred"
    );
  }
}
