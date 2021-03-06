var runNumDoms;
$(function () {
	if (typeof top._isOnlyMainPage != 'undefined') {
		$('#4GbaseNum').parent().append('/<span id="4GloseNum"></span>').prev().find('span').html('/掉站');
		$('#3GbaseNum').parent().append('/<span id="3GloseNum"></span>').prev().find('span').html('/掉站');
	}
	send_echo();
	runNumDoms = $('#4GbaseNum, #4GloseNum, #3GbaseNum, #3GloseNum, #opticalFiber, #itvOnline, #broadBOnline, #4GonlineNum, #conlineNum');
});

function send_echo() {
	var echo_websocket = new WebSocket("ws://" + url + "/bigscreen-schedule/websocket/bigScreenWebSocket");
	echo_websocket.onopen = function () {
		console.log('websocket已连接...');
		echo_websocket.send("anotherScreen");
	};
	//处理服务端返回消息
	echo_websocket.onmessage = function (event) {
		var datas = JSON.parse(event.data);
		console.log(event.data); //处理服务端返回消息
		if (datas.TSR_CODE == "0") {
			dataLeftPublic(datas)
		}
	};
	//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = closeWebSocket;
	
	//关闭WebSocket连接
	function closeWebSocket() {
		echo_websocket.close();
	}
	
	//websocket断开
	echo_websocket.onclose = function (event) {
		console.log('websocket已关闭...');
	};
}

//数据显示函数
function dataLeftPublic(data) {
	var _4GbaseNum = parseInt(data.body.fouGBaseStation);
	$("#4GbaseNum").text(_4GbaseNum.toLocaleString()).data('runNum', _4GbaseNum);  //4G基站数量
	var _4GloseNum = parseInt(data.body.fouGfault);
	$('#4GloseNum').text(_4GloseNum.toLocaleString()).data('runNum', _4GloseNum);
	var _3GbaseNum = parseInt(data.body.thrGBaseStation);
	$("#3GbaseNum").text(_3GbaseNum.toLocaleString()).data('runNum', _3GbaseNum);	//3G基站数量
	var _3GloseNum = parseInt(data.body.thrGFault);
	$('#3GloseNum').text(_3GloseNum.toLocaleString()).data('runNum', _3GloseNum);
	var _4GonlineNum = parseInt(data.body.fouGOnline);
	$("#4GonlineNum").text(_4GonlineNum.toLocaleString()).data('runNum', _4GonlineNum);     //4G在线用户数
	var _conlineNum = parseInt(data.body.cdmVoiOnline);
	$("#conlineNum").text(_conlineNum.toLocaleString()).data('runNum', _conlineNum);//C网语音在线用户数
	var _itvOnline = parseInt(data.body.itvOnline);
	$("#itvOnline").text(_itvOnline.toLocaleString()).data('runNum', _itvOnline);  //iTV在线用户数
	var _broadBOnline = parseInt(data.body.broadBOnline);
	$("#broadBOnline").text(_broadBOnline.toLocaleString()).data('runNum', _broadBOnline);  //宽带在线用户数
	var _opticalFiber = parseInt(data.body.opticalFiber);
	$("#opticalFiber").text(_opticalFiber.toLocaleString()).data('runNum', _opticalFiber);  //光分纤点
	
	
	
	$("#fouGSpeBraw").text(data.body.fouGSpeBraw.fouGSpe + '/' + data.body.fouGSpeBraw.fouGBraw + 'Gbps');//4G核心网流速/带宽
	$("#fouGSpeBrawWidth").width(((data.body.fouGSpeBraw.fouGSpe / data.body.fouGSpeBraw.fouGBraw) * 610) + 'px');
	$("#4G_rates").text(data.body.fouGSpeBraw.fouGRate);
	$("#idcRentNumber").text(data.body.idcRentFrame.rent + '/' + data.body.idcRentFrame.frame + '台');//IDC租用量/机架数
	$("#idc_rate").text(data.body.idcRentFrame.rate);
	$("#idcRentNumberWidth").width(((data.body.idcRentFrame.rent / data.body.idcRentFrame.frame) * 630) + 'px');
	$("#manetSpeBraw").text(data.body.manetSpeBraw.manetSpe + '/' + data.body.manetSpeBraw.manetBraw + 'Tbps');//城域网出口流速/带宽
	$("#manetSpeBrawRate").text(data.body.manetSpeBraw.manetRate);
	$("#manetSpeBrawWidth").width(((data.body.manetSpeBraw.manetSpe / data.body.manetSpeBraw.manetBraw) * 315) + 'px');
	$("#idcSpeBraw").text(data.body.idcSpeBraw.spe + '/' + data.body.idcSpeBraw.braw + 'Tbps');//IDC出口流速/带宽
	$("#idcSpeBrawRate").text(data.body.idcSpeBraw.rate);
	$("#idcSpeBrawWidth").width(((data.body.idcSpeBraw.spe / data.body.idcSpeBraw.braw) * 315) + 'px');
	//端口
	$("#pon").text(data.body.PON.ponUse + '/' + data.body.PON.ponTotal + '万个');//占用端口
	$("#ponRentNumberWidth").width(((data.body.PON.ponUse / data.body.PON.ponTotal) * 315) + 'px');
	$("#pon_rate").text(data.body.PON.ponRate);
	
	$("#hangYeYunNumber").text(data.body.hangYeYun.hyUse + '/' + data.body.hangYeYun.hyTotal + '台');//IDC租用量/机架数
	$("#hangYeYunNumberWidth").width(data.body.hangYeYun.hyRate);
	$("#hangYeYun_rate").text(data.body.hangYeYun.hyRate);
	
	//CT云+网管云+业务云/总数
	var yewuyun = data.body.yeWuYun;
	$("#yunDetail").text(yewuyun.CT+'+'+yewuyun.netManage+'+'+yewuyun.business+'/'+yewuyun.total + '台');
	$("#ctyun").width(((yewuyun.CT / yewuyun.total) * 630) + 'px');
	$("#wangguanyun").width(((yewuyun.netManage / yewuyun.total) * 630) + 'px');
	$("#yewuyun").width(((yewuyun.business / yewuyun.total) * 630) + 'px');
	$("#yunDetail_rate").text((yewuyun.CT / yewuyun.total+yewuyun.business / yewuyun.total+yewuyun.netManage / yewuyun.total).toFixed(2)*100+'%');
	startRun();
}

var numRunSetInterval;

function startRun() {
	runNumDoms.each(function (i, v) {
		runToAimNum(v, $(v).data('runNum'));
	});
	if (!numRunSetInterval) {
		numRunSetInterval = setInterval(startRun, 60000);
	}
}
var _preTime = 50, _totalTime = 3000;
function runToAimNum(domObj, aimNum) {
	var overFun = function (isEnd) {
		if (domObj.numRunSetInterval) {
			clearInterval(domObj.numRunSetInterval);
			domObj.numRunSetInterval = null;
		}
		if (isEnd) {
			domObj.innerHTML = parseInt(aimNum).toLocaleString();
		}
	};
	overFun();
	var i = 0, preNum = aimNum / (_totalTime / _preTime);
	domObj.numRunSetInterval = (function (_domObj, _aimNum, _overFun) {
		return setInterval(function () {
			_domObj.innerHTML = parseInt(i).toLocaleString();
			i += preNum;
			if (i >= _aimNum) {
				_overFun(true);
			}
		}, _preTime);
	})(domObj, aimNum, overFun);
}
