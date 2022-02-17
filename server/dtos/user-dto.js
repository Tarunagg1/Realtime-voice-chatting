class UserDao{
    _id;
    phone; activated;
    createdAt;

    constructor(user){
        this._id = user._id;
        this.activated = user.activated;
        this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
        this.phone = user.phone;
        this.createdAt = user.createdAt;
    }
}


module.exports = UserDao;
