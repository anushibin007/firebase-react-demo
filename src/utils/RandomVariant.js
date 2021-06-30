export const getRandomVariant = () => {
	var arr = ["success", "danger", "warning"];

	function random(mn, mx) {
		return Math.random() * (mx - mn) + mn;
	}

	return arr[Math.floor(random(1, arr.length + 1)) - 1];
};
