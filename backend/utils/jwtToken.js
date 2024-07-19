export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  const cookieName = user.role === 'Admin' ? 'adminToken' : user.role === 'UniversityAdmin' ? 'universityToken' : 'userToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

export const generateTokenUniversity = (university, message, statusCode, res) => {
  const token = university.generateJsonWebToken();
  const cookieName = 'universityToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
    })
    .json({
      success: true,
      message,
      university,
      token,
    });
};

