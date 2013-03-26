define([], function(){

	var getCurrentDateTime = function(){
		var d = new Date();
		return d;
	};

	return {
		getCurrentDateTime: getCurrentDateTime
	};
});