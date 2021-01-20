export const checkResponseStatus = (error: { status: number }) => {
  if (error.status === 404) {
    return [];
  } else {
    throw error;
  }
};
