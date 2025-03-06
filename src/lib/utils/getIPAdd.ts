const ipAddress = async () => {
  try {
    const res = await fetch("https://checkip.amazonaws.com");
    const ip = await res.text();
    return ip.trim();
  } catch (error) {
    console.error("Error fetching IP:", error);
    return null;
  }
};

ipAddress().then((ip) => console.log('Your IP:', ip));
