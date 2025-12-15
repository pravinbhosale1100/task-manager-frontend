export function decodeToken(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
}
