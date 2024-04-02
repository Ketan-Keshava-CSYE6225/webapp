export const mapUserToUserLogRead = (user) => {
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      account_created: user.account_created,
      account_updated: user.account_updated,
      verification_token: user.verification_token,
      verification_link_expiry_timestamp: user.verification_link_expiry_timestamp,
      user_verification_status: user.user_verification_status
    };
  };