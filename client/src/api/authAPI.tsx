import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // Throw error if response status is not OK (200-299)
    if (!response.ok) {
      const errorData = await response.json(); // parse error response as JSON
      throw new Error(`Error: ${errorData.message}`);  
    }

    // Parse the res.body as JSON
    const data = await response.json();

    return data; // Return the data receive from server
  } catch (err) {
    console.log(`Error from user login: `, err);

    return Promise.reject('Could not fetch user info');
  }
}

export { login };
