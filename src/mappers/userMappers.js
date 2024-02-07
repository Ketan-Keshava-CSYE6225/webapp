const mapUserWithoutPassword = (user) => {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.dataValues.password;

    return userWithoutPassword.dataValues;
};

export { mapUserWithoutPassword }