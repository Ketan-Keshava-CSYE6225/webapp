export const mapUserToUserResponse = (user) => {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      account_created: user.account_created,
      account_updated: user.account_updated,
    };
  };