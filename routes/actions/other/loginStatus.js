module.exports = async (req, res) => {
<<<<<<< HEAD
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
=======
	if (req.session && req.session.userInfo) {
>>>>>>> 00bf385fb6be72647f14dbfa9f67f33d748aaa9f
		const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"`
		res.send(s)
	}else {
		res.send('var isLogin = false')
	}
};
